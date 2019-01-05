var express = require('express'); //require express functionality
var router = express.Router(); //attach "router" variable to express's router method
//use router method when an  attempt is made to http get the top level directory of our website


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', {title: 'Hello, World!'});
});

module.exports = router;

//Changes to Jade templates do not require a server restart (npm start), but changes to a js file do (i.e. app.js)
