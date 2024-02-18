// fetch('http://localhost:3000/log', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ key: 'value' }), // Replace this with your JSON payload
// }).then(response => response.text()).then(data => console.log(data));

// fetch('http://localhost:3000/download-database', {
//   method: 'GET'//,
//   //headers: {
//     //'Content-Type': 'application/json',
//   //},
//   //body: JSON.stringify({ key: 'value' }), // Replace this with your JSON payload
// }).then(response => response.text()).then(data => console.log(data));



fetch('https://remote-logs-54f31522b54750203a82019006ac7529.vercel.app/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers your service requires
  },
  body: JSON.stringify({
    "log": "test",
    "userdata": {
      username: "test",
      email: "test@test.test",
      userid: "test@test.test"
    },
    "username": "test",
    "env": "development",
    "project": "TEST"
  })
})
  .then(response => {
    let content = response.text();
    try {
      content = JSON.parse(content);
    } catch (error) {
      //console.log(error);
    };
    return content;
  })
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));

fetch('https://remote-logs-54f31522b54750203a82019006ac7529.vercel.app/download-logs?project=TEST', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers your service requires
  }
})
  .then(response => {
    let content = response.text();
    try {
      content = JSON.parse(content);
    } catch (error) {
      //console.log(error);
    };
    return content;
  })
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));