const express = require('express')
const router = express.Router();
const Beer = require('../models/beer');

router.route('/random')
  .get((req, res) => {
    Beer.getRandomBeer((err, beers) => {
      res.status(err ? 400: 200).send(err || beers);
    })
  })

module.exports = router;
