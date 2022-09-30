// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSflyOverTime } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP((ip),(error, longitude, latitude) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    fetchISSflyOverTime(latitude,longitude,(error, passTime) => {
      if (error) {
        console.log("it did not work", error);
        return;
      }
      //console.log(passTime);
      for(i in passTime) {
        console.log(`Rise time: ${passTime[i].risetime}  duration time:${passTime[i].duration}`);
      }
    });
  });

});

