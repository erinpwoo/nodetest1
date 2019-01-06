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

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

/*GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

router.post('/adduser', function(req, res){
  //set up local db variable
  var db = req.db;

  //get our form values. these rely on the "name" attributes from newuser.jade
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //set collection
  var collection = db.get('usercollection');

  //submit to the db
  collection.insert({
    "username" : userName,
    "useremail" : userEmail
    } , function (err, doc) {
      if (err) {
        //fail case
        res.send("There was a problem adding information to the database.");
      } else {
        //forward to success page
        res.redirect("userlist");
      }
    });
  });

module.exports = router;

//Changes to Jade templates do not require a server restart (npm start), but changes to a js file do (i.e. app.js)
