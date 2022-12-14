const request = require('request');

const fetchMyIP = (callback) => {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    // console.log('error:', error);
    // console.log('response:',response);
    // console.log('body',body);

    if (error) {
      callback(error,null); return;
    }
    if (response.statusCode !== 200) {
      const errMsg = `statusCode ${response.statusCode} while fetching.`;
      callback(Error(errMsg),null); return;
    }
    const ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};

const fetchCoordsByIP = (ip,callback) => {
  //console.log(ip);
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    // console.log('error:', error);
    // console.log('response:',response);
    //console.log('body',body);
    if (error) {
      callback(error,null); return;
    }

    const jsonPrasedBody = JSON.parse(body);
    if (!jsonPrasedBody.success) {
      const errMsg = `success status was ${jsonPrasedBody.success}.\n
      Server message: ${jsonPrasedBody.message}.\n
      when fetching for IP ${jsonPrasedBody.ip}`;
      callback(Error(errMsg),null);
      return;
    }
    let data = JSON.parse(body);
    //onsole.log(data);
    let {latitude, longitude} = data;
    callback(error, longitude, latitude);
  });
};

const fetchISSflyOverTime = (latitude,longitude, callback) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if(error) {
      callback(error,null);
      return;
    }

    if(response.statusCode !== 200) {
      const errMsg = `Statuscode ${response.statusCode} while fetching ISS pass time: ${body}`;
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
}


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSflyOverTime
};