const express = require('express');

const app = express();
const port = 8080;

var unixDate = function(time) {
  time = new Date(time);
  return `${Math.round(+time / 1000)}`;
}

var naturalDate = function(time) {
  time = new Date(time);
  return `${getMonthName(time)} ${time.getDate()}, ${time.getFullYear()}`;
}

var getMonthName = function(time) {
  var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  return monthNames[time.getMonth()];
}

app.get('/*', (req, res) => {
  var time = null;
  var query = req.path;

  if(query == '/') {
    time = { unix: null, natural: null };
  } else if(query.match(/^\/\d{10}$/)) {  // got a unix timestamp
    time = +query.match(/^(\/)(\d{10})$/)[2] * 1000;
    query = query.match(/^(\/)(.*)$/)[2];
    time = { unix: query, natural: naturalDate(time) };
  } else if(query.match(/^(\/)(.*)$/)) {                // got a natural language date
    time = decodeURI(query.match(/^(\/)(.*)$/)[2]);
    query = time;
    time = { unix: unixDate(time), natural: query };
  }
  res.status(200).type('application/json');
  res.json(time);
});

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;