const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World!</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
        }
        h1 {
          font-size: 3rem;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Hello World Indonesia !!</h1>
    </body>
    </html>
  `);
});

module.exports = router;