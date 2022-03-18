const { myIP } = require('./IP');
const { fetchMyIP, fetchCoordsByIP } = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) return console.error("No go. Didn't connect to IP", error);

//   console.log('Gotcha! Returned IP: ', ip);
// });

fetchCoordsByIP(myIP, (error, data) => {
  if (error) return console.error("No go. Didn't connect to GEO tracking", error);

  console.log('Gotcha! Returned Position: ', data);
});
