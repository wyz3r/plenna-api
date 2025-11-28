const autocannon = require("autocannon");

autocannon({
  url: "http://localhost:3000/doctors/availability",
  connections: 50,
  duration: 10
}, console.log);

autocannon({
  url: "http://localhost:3000/doctors/availabilityddd",
  connections: 50,
  duration: 10
}, console.log);
