const { myIP, urlISS, myCoords } = require('./IP');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) return console.error("No go. Didn't connect to IP", error);

//   console.log('Gotcha! Returned IP: ', ip);
// });

// fetchCoordsByIP(myIP, (error, data) => {
//   if (error) return console.error("No go. Didn't connect to GEO tracking", error);

//   console.log('Gotcha! Returned Position: ', data);
// });

// fetchISSFlyOverTimes(myCoords, (error, data) => {
//   if (error) return console.error("No go. Didn't connect to ISS tracking", error);

//   console.log('Gotcha! Returned Fly Over Times: ', data);
// })

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});