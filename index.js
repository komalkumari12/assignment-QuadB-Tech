const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const data = await axios('https://api.wazirx.com/api/v2/tickers');
    const keys = Object.keys(data.data);
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push(data.data[keys[i]]);
    }
    res.render('index', {
      data: arr.slice(0, 10),
    });
  } catch (err) {
    res.render('404');
  }
});

app.post('/', async (req, res) => {
  try {
    const data = await axios('https://api.wazirx.com/api/v2/tickers');
    const { currency } = req.body;
    const keys = Object.keys(data.data);
    let newCurr = currency.toLowerCase() + 'inr';
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].includes(newCurr)) {
        arr.push(data.data[keys[i]]);
      }
    }
    res.render('index', {
      data: arr,
    });
  } catch (err) {
    res.render('404');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
