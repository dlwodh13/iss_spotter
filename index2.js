const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
  .then(body => fetchCoordsByIP(body))
  .then(body => fetchISSFlyOverTimes(body))
  .then(data => console.log(JSON.parse(data).response))
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });