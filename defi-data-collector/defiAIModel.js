const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');
const fs = require('fs');

// Читання назв протоколів із файлу
const protocolNames = fs.readFileSync('unique_names.txt', 'utf-8').split('\n').map(name => name.trim());

// Завантаження даних з API для кожного протоколу
async function fetchProtocolData(protocolName) {
    const url = `https://api.llama.fi/protocol/${protocolName}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${protocolName}:`, error.message);
        return null;
    }
}

// Нормалізація окремих масивів даних
function normalize(data) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    return data.map(value => (value - min) / (max - min));
}

// Функція заповнення вхідних масивів до фіксованої довжини
function padInput(input, targetLength = 10) {
    const paddedInput = [...input];
    while (paddedInput.length < targetLength) {
        paddedInput.push(0); // Додаємо нулі для заповнення
    }
    return paddedInput.slice(0, targetLength); // Якщо довжина більше, обрізаємо
}

// Підготовка даних для одного протоколу
function createTrainingDataForProtocol(protocolData) {
    const input = padInput([
        protocolData.tvl,
        protocolData.change_1h || 0,
        protocolData.change_1d || 0,
        protocolData.change_7d || 0,
        ...Object.values(protocolData.chainTvls)
    ]);
    
    const output = protocolData.tvl;
    return { input, output };
}

// Створення моделі з фіксованим розміром входу
function createModel(inputSize) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [inputSize] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    });

    return model;
}

// Основна функція для навчання після кожного запиту
async function trainModelSequentially() {
    const model = createModel(10); // Використовуємо фіксований розмір входу (10 ознак)

    for (const name of protocolNames) {
        const protocolData = await fetchProtocolData(name);
        if (!protocolData) continue;

        // Підготовка навчальних даних для одного протоколу
        const { input, output } = createTrainingDataForProtocol(protocolData);
        const normalizedInput = normalize(input);
        const normalizedOutput = normalize([output]);

        // Створюємо тензори для навчання
        const xs = tf.tensor2d([normalizedInput], [1, normalizedInput.length]);
        const ys = tf.tensor2d([normalizedOutput], [1, 1]);

        // Навчання моделі на даних протоколу
        await model.fit(xs, ys, {
            epochs: 10,
            batchSize: 1,
            verbose: 1
        });

        console.log(`Trained model on protocol: ${name}`);

        // Очищення пам'яті
        xs.dispose();
        ys.dispose();
    }

    console.log('Model training complete');
    return model;
}

// Запуск навчання
trainModelSequentially().then(model => {
    console.log('Training finished');
    model.save('file://./tvl_prediction_model'); // Зберігаємо модель для подальшого використання
  }).catch(error => console.error('Error during training:', error));