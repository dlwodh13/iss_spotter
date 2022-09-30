// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return (request('https://api.ipify.org?format=json'));
};
const fetchCoordsByIP = function(body) {
  //console.log("ipString: ",ipString)
  const ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`);
};
const fetchISSFlyOverTimes = function(body) {
  let {latitude, longitude} = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };