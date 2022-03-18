const request = require('request');
const { urlIP, urlGEO, myIP } = require('./IP')


const fetchMyIP = callback => {
  request(urlIP, (error, response, body) => {
    if (error) return (error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    return callback(null, JSON.parse(body).ip);
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

    return JSON.parse(body).ip && callback(null, data)
  })
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};