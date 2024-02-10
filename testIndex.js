fetch('http://localhost:3000/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }), // Replace this with your JSON payload
}).then(response => response.text()).then(data => console.log(data));

fetch('http://localhost:3000/download-database', {
  method: 'GET'//,
  //headers: {
    //'Content-Type': 'application/json',
  //},
  //body: JSON.stringify({ key: 'value' }), // Replace this with your JSON payload
}).then(response => response.text()).then(data => console.log(data));
