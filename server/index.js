const express = require('express');
const axios = require('axios').default;
const token = require('../config.js');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/heartFailures', (req, res) => {
  axios({
    method: 'GET',
    url: 'https://data.medicare.gov/resource/ynj2-r877.json?$limit=50000',
    headers: {
      'app_token': token.DATA_MEDICARE_GOV_APP_TOKEN
    },
  })
  .then((response) => {
    // Filter results to only "Heart Failure" treatments
    let filterHeartFailures = response.data.reduce((accumulator, currentValue) => {
      if (currentValue.measure_id === 'MORT_30_HF') {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    // Grouping by state
    let groupedStates = filterHeartFailures.reduce((allStates, data) => {
      if (data.state in allStates) {
        allStates[data.state].mortalityScore++;
      }
      else {
        allStates[data.state] = {'mortalityScore': 1};
      }
      return allStates
    }, {})

    res.status(200).send(groupedStates)
  })
  .catch((err) => {
    res.send(err)
  })
});

module.exports = app;
