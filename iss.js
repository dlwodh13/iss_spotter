const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    // console.log('error:', error);
    // console.log('response:',response);
    // console.log('body',body);

    if (error) {
      callback(error,null); return;
    }
    if (response.statusCode !== 200) {
      const errorMessage = `statusCode ${response.statusCode} while fetching.`;
      callback(errorMessage,null); return;
    }
    const ip = JSON.parse(body);
    callback(null,ip);
  });
};

module.exports = {fetchMyIP};