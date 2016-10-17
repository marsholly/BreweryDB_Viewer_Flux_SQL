const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');
const connection = require('../../config/db');

connection.query(`create table if not exists beerView(
  id varchar(50),
  beerName varchar(50),
  marked boolean,
  comment varchar(500),
  rate int)`, err=>{
    if(err){
      console.log('Table create error:', err);
    }
  });

exports.getBeers = function(){
  return new Promise((resolve, reject)=>{
    let sql = squel.select()
                   .from('beerView')
                   .toString();
    connection.query(sql, function(err, beers){
      if(err){
        reject(err);
      }else{
        resolve(beers);
      }
    });
  });
};


exports.saveBeer = function(newBeer){
  return new Promise((resolve, reject)=>{
    newBeer.marked = newBeer.marked === 'false' ? false : true;
    let sql = squel.insert()
                   .into('beerView')
                   .setFields(newBeer)
                   .set('id', uuid())
                   .toString();

                   console.log('sql:', sql)
    connection.query(sql, err=>{
      if(err){
        reject(err);
      }else{
        resolve();
      }
    });
  });
};

exports.getOneBeer = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
    .from('beerView')
    .where('id = ?', id)
    .toString();

    connection.query(sql, (err, beers) => {
      let beer = beers[0];

      if(err) {
        reject(err);
      } else if(!beer) {
        reject({error: 'beer not found.'})
      } else {
        resolve(beer);
      }
    });
  });
};

exports.updateBeer = function(id, updateObj) {
  return new Promise((resolve, reject) => {
    updateObj.marked = updateObj.marked === 'false' ? false : true;
    delete updateObj.id;

    let sql = squel.update()
                   .table('beerView')
                   .setFields(updateObj)
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, okObject) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


exports.deleteBeer = function(id){
  return new Promise((resolve, reject)=>{
    let sql = squel.delete()
                   .from('beerView')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, result)=>{
      if(result.affectedRows === 0){
        reject({error: 'The beer not found.'});
      }else if(err){
        reject(err);
      }else{
        resolve();
      }
    });
  });
};
