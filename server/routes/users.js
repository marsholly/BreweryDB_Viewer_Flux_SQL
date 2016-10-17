const express = require('express')
const router = express.Router();
const User = require('../models/user');

router.route('/')
  .get((req, res) => {
    User.getBeers()
   .then(beers => {
      res.send(beers);
   })
   .catch(err=>{
      res.status(400).send(err);
   })
 })
  .post((req, res) => {
    User.saveBeer(req.body)
     .then(()=>{
        res.send();
     })
     .catch(err=>{
        res.status(400).send(err);
     });
  });


router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    User.getOneBeer(id)
      .then(beer => {
        res.send(beer);
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })
  .delete((req, res) => {
    let id = req.params.id;
    User.deleteBeer(id)
       .then(()=>{
          res.send();
       })
       .catch(err=>{
          res.status(400).send(err);
       })
  })
  .put((req, res) => {
    let id = req.params.id;
    User.updateBeer(id, req.body)
     .then(()=>{
        return User.getOneBeer(id);
     })
     .then(beer=>{
        res.send(beer);
     })
     .catch(err=>{
        res.status(400).send(err);
     })
  })


module.exports = router;
