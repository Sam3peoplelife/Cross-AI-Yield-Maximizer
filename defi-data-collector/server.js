// Create a server to serve predictions
const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');
const app = express();
const port = 3001;

// Load the trained model
tf.loadLayersModel('file://./tvl_prediction_model/model.json').then(model => {
    loadedModel = model;


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

function padInput(input, targetLength = 10) {
    const paddedInput = [...input];
    while (paddedInput.length < targetLength) {
      paddedInput.push(0); // Додаємо нулі для заповнення
    }
    return new Int32Array(paddedInput.slice(0, targetLength)); // Convert to TypedArray
  }


// Define a route for the prediction endpoint
app.get('/predict/:protocolName', (req, res) => {
  const protocolName = req.params.protocolName;
  console.log(`Received request for protocol: ${protocolName}`);

  // Fetch protocol data from API
  fetchProtocolData(protocolName).then(protocolData => {
    if (!protocolData) {
      res.status(404).send(`Protocol not found: ${protocolName}`);
      return;
    }

    // Prepare input data for prediction
    const input = padInput([
        protocolData.tvl,
        protocolData.change_1h || 0,
        protocolData.change_1d || 0,
        protocolData.change_7d || 0,
        ...Object.values(protocolData.chainTvls)
      ]);

    // Make prediction using the trained model
    if (loadedModel.predict) {
        const prediction = loadedModel.predict(tf.tensor2d(input, [1, input.length]));
        const predictedValue = prediction.dataSync()[0];
  
        // Send the prediction back to the client
        res.json({ prediction: predictedValue });
      } else {
        res.status(500).send('Error: Model not loaded correctly');
      }
  });
});
}).catch(error => {
    console.error('Error loading model:', error);
    res.status(500).send('Error: Model not loaded correctly');
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});