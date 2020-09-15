const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// get request is a shlash /

app.get('/', (req, res) => {
  res.send('hellow ron');
});

app.listen(port, () => {
  console.log(`Running on port + ${port}`);
});
