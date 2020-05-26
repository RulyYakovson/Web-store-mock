var express = require('express');
const cors = require('cors');
var router = express.Router();

router.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

router.get('/', function(req, res, next) {
  console.log('aaaaaaaaaaaaaaaaaaa');
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  await setTimeout(() => {
    console.log('bbbbbbbbbbbbbbbbbb');
    res.status(200);
    res.json({ user: { name: 'Ruli', role: 'Admin' } });
  }, 3000);
});

module.exports = router;
