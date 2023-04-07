const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const apiKey = 'afed2cd1783f4e0ba9c84c706e60aeb7';
const apiUrl = 'https://polkadot.api.subscan.io/api/scan/blocks';

const row = 100; // Number of transactions to fetch
const page = 0; // Page number, starting from 0

axios.post(apiUrl, {
  row: row,
  page: page
}, {
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey
  }
})
.then(response => {
  // Check if responseData is an object with a 'data' property
  if (response.data && response.data.data) {
    const responseData = response.data.data;
    
    // Create CSV writer
    const csvWriter = createCsvWriter({
      path: 'transactions.csv',
      header: [
        {id: 'block_num', title: 'Block Number'},
        {id: 'delegation', title: 'Delegation'},
        {id: 'nominator', title: 'Nominator'},
        {id: 'validator', title: 'Validator'}
      ]
    });

    // Write data to CSV file
    csvWriter.writeRecords(responseData)
      .then(() => {
        console.log('CSV file has been written successfully.');
      })
      .catch(error => {
        console.error('Error writing CSV file:', error);
      });
  } else {
    console.error('Error: responseData is not an object with a "data" property.');
  }
})
.catch(error => {
  // Handle any errors here
  console.error('Error:', error.message);
});