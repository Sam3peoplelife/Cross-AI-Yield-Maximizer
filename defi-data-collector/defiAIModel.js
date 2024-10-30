const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');
const fs = require('fs');

const protocolNames = fs.readFileSync('unique_names.txt', 'utf-8').split('\n').map(name => name.trim());

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

function normalize(data) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    return data.map(value => (value - min) / (max - min));
}

function padInput(input, targetLength = 10) {
    const paddedInput = [...input];
    while (paddedInput.length < targetLength) {
        paddedInput.push(0);
    }
    return paddedInput.slice(0, targetLength);
}

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

function createModel(inputSize) {
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [inputSize] }));
    model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [inputSize] }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [inputSize] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    });

    return model;
}

async function trainModelSequentially() {
    const model = createModel(10);

    for (const name of protocolNames) {
        const protocolData = await fetchProtocolData(name);
        if (!protocolData) continue;
        const { input, output } = createTrainingDataForProtocol(protocolData);
        const normalizedInput = normalize(input);
        const normalizedOutput = normalize([output]);

        const xs = tf.tensor2d([normalizedInput], [1, normalizedInput.length]);
        const ys = tf.tensor2d([normalizedOutput], [1, 1]);

        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 3,
            verbose: 1
        });

        console.log(`Trained model on protocol: ${name}`);

        xs.dispose();
        ys.dispose();
    }

    console.log('Model training complete');
    return model;
}

trainModelSequentially().then(model => {
    console.log('Training finished');
    model.save('file://./tvl_prediction_model');
  }).catch(error => console.error('Error during training:', error));