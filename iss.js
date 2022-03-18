const request = require('request');
const { urlIP, urlGEO, urlISS, myIP, } = require('./IP')


const fetchMyIP = callback => {
  request(urlIP, (error, response, body) => {
    if (error) return (error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
}

const fetchCoordsByIP = (ip, callback) => {
  request(urlGEO, (error, response, body) => {
    const data = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    }
    if (error) return (error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching GEO info. Response: ${body}`;
      return callback(Error(msg), null);
    }
    return callback(null, data)
  })
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(urlISS, (error, response, body) => {

    if (error) return (error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS info. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const passTimes = JSON.parse(body).response;
    return callback(null, passTimes)
  })
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes)
      })
    })
  })
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};