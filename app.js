const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({ msg: 'ok' });
});

console.log('Ghost was here and fixed the bug!');

app.listen(3000);