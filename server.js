//////////////////////////////////////////////////////////
// firebase
//////////////////////////////////////////////////////////
<script src="https://www.gstatic.com/firebasejs/3.4.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxEIuUGBV-Ny4eIu46cuN75hsCoBVmXss",
    authDomain: "hackjam2016underdogflatmate.firebaseapp.com",
    databaseURL: "https://hackjam2016underdogflatmate.firebaseio.com",
    storageBucket: "hackjam2016underdogflatmate.appspot.com",
    messagingSenderId: "979213610760"
  };
  firebase.initializeApp(config);
</script>


//////////////////////////////////////////////////////////
// configurations
//////////////////////////////////////////////////////////
var RUNNING_ON_ITSC_SERVER = false;
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var pg = require('pg');
var app = express();

var path = require("path");

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP; // only for openshift
var DATABASE_URL;

// //////////////// on openshift
// if (process.env.OPENSHIFT_NODEJS_PORT) {
//   DATABASE_URL = process.env.OPENSHIFT_POSTGRESQL_DB_URL;//"postgresql://adminmnvdci3:72fAHfuEN5q6";
//
//   app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 8080));
//   app.listen(app.get('port'), server_ip_address, function() {
//     console.log('Node (openshift) app is running on port', app.get('port'));
//   });
// }
// /////////////// on heroku or local
// else {
//   DATABASE_URL = process.env.DATABASE_URL
//     || "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"+'?ssl=true';
//
//   app.set('port', (process.env.PORT || 5000));
//   app.listen(app.get('port'), function() {
//     console.log('Node (heroku & local) app is running on port', app.get('port'));
//   });
// }
if (RUNNING_ON_ITSC_SERVER) {
  process.chdir("/home/guacamoli/guacamoli");
  DATABASE_URL = "postgres://guacamoli:1234@localhost:5432/guacamoli";
  app.set('port', 80);
  app.listen(app.get('port'), function() {
    console.log('Node (ust.hk) app is running on port', app.get('port'));
  });
}
else {
  DATABASE_URL = process.env.DATABASE_URL
                || "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"+'?ssl=true';

  app.set('port', (process.env.PORT || 5000));
  app.listen(app.get('port'), function() {
    console.log('Node (heroku & local) app is running on port', app.get('port'));
  });
}


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  //res.sendFile(__dirname + '/index.html')
});




//////////////////////////////////////////////////////////////
// admin routes
/////////////////////////////////////////////////////////////


app.get('/admin_only_menu_list', function (req, res) {
  console.log("menu_list");
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT id, name FROM meal",
                  function(err, result) {
      if (err){
        console.error(err); res.send("Error " + err);
      }
      else{
        console.log(result.rows);
        res.render('pages/menu_list', {results: result.rows});
      }
    });
    done();
  });
});


app.get('/admin_only_update_menu/:menuId', function (req, res) {
  console.log("/admin_only_update_menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "WHERE meal.id = $1",
                  [req.params.menuId],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu select result");
        console.log(result.rows);
        res.render('pages/updateMenu', {result: result.rows[0]});
      }
    });
    done();
  });
});


app.get('/menu/:menuId', function (req, res) {
  console.log("/menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "WHERE meal.id = $1",
                  [req.params.menuId],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu select result");
        console.log(result.rows);
        res.render('pages/menu', {result: result.rows[0]});
      }
    });
    done();
  });
});

app.get('/admin_only_update_menu/:menuId', function (req, res) {
  console.log("/admin_only_update_menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "WHERE meal.id = $1",
                  [req.params.menuId],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu select result");
        console.log(result.rows);
        res.render('pages/updateMenu', {result: result.rows[0]});
      }
    });
    done();
  });
});


app.get('/admin_only_insert_menu', function(request, response) {
  response.render('pages/insertMenu');
});



////////////////////////////////////////////
//      REACT APIS
////////////////////////////////////////////

app.get('/api/menu/:menuId', function (req, res) {
  console.log("/menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "WHERE meal.id = $1",
                  [req.params.menuId],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu select result");
        console.log(result.rows);
        res.status(200).send(result.rows[0]);
      }
    });
    done();
  });
});


app.get('/api/getCanteenList', function(req,res) {
  console.log(req.query.restaurantId+" menus");

  restaurantId=req.query.restaurantId;
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT id, name, picture_url, price FROM meal WHERE restaurantId = $1",[restaurantId],
    function(err, result) {
      if (err){
        console.error(err); res.send("Error " + err);
      }
      else{
        console.log(result.rows);
        res.status(200).send(result.rows);
      }
    });
    done();
  });
});

app.get('/api/getAllRankings', function(req, res) {
  console.log("/getRankings");


  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT id, name, picture_url, rank, price FROM meal",
    function(err, result) {
      if (err){
        console.error(err); res.send("Error " + err);
      }
      else{
        console.log(result.rows);

        var lg1Result = new Array();
        var grbResult = new Array();
        var apcResult = new Array();
        var millanoResult = new Array();

        for (var i=0; i<result.rows.length; ++i) {
          if ((result.rows[i].restaurantid) == 1) { // restaurant id == lg1
            lg1Result.push(result.rows[i]);
          }
          else if ((result.rows[i].restaurantid) == 3) { // restaurant id == GRB
            grbResult.push(result.rows[i]);
          }
          else if ((result.rows[i].restaurantid) == 4) { // restaurant id == APC
            apcResult.push(result.rows[i]);
          }
          else if ((result.rows[i].restaurantid) == 5) { // restaurant id == APC
            millanoResult.push(result.rows[i]);
          }
        }

        lg1Result.sort(function(a,b){return b-a;}).slice(0,5);
        grbResult.sort(function(a,b){return b-a;}).slice(0,5);
        apcResult.sort(function(a,b){return b-a;}).slice(0,5);
        millanoResult.sort(function(a,b){return b-a;}).slice(0,5);

        var finalResult = [{restaurant_id: 1, title:'lg1 ranking', rankingArray:lg1Result},
                            {restaurant_id: 3, title:'grb ranking', rankingArray:grbResult},
                            {restaurant_id: 4, title:'apc ranking', rankingArray:apcResult},
                            {restaurant_id: 5, title:'millano ranking', rankingArray:millanoResult}
                          ];

        res.status(200).send(finalResult);
      }
    });
    done();
  });

});

app.get('/api/query_search', function (req,res) {
  var keyword = req.query.query.toLowerCase();
  console.log("getMenusBySearchTerm: keyword = "+keyword);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT id, name, picture_url FROM meal",
    function(err, result) {
      if (err){
        console.error(err); res.send("Error " + err);
      }
      else{
        var finalResult = new Array();

        for (var i=0; i<result.rows.length; ++i) {
          // keyword is a substring of the meal name
          if ((result.rows[i].name.toLowerCase()).indexOf(keyword) !== -1) {
            //console.log(result.rows[i]);
            finalResult.push(result.rows[i]);
          }
        }
        console.log(finalResult);
        res.status(200).send(finalResult);
      }
    });
    done();
  });
});

app.post('/api/filter_search', function (req,res) {
  var _restaurantId = req.body.restaurantId;
  var _deliveryTime = req.body.deliveryTime;
  var _offeredTime = req.body.offeredTime;
  var _cusine = req.body.cuisine;
  var _tasteType = req.body.tasteType;

  console.log("getMenusByFilterTerm: ");
  console.log("req.query.restaurantId="+_restaurantId);
  console.log("req.query.tasteType="+_tasteType);

  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal",
    function(err, result) {
      if (err){
        console.error(err); res.send("Error " + err);
      }
      else{
        var finalResult = new Array();
        // filter each item one by one
        for (var i=0; i<result.rows.length; ++i) {
          var validMenuFlag = true;

          if (!(_restaurantId==0 || _restaurantId == result.rows[i].restaurantid)) {
            validMenuFlag = false;
          }
          if (!(_deliveryTime==0 || _deliveryTime == result.rows[i].deliveryspeedid)) {
            validMenuFlag = false;
          }
          if (!(_offeredTime==0 || _offeredTime == result.rows[i].offeredtimesid)) {
            validMenuFlag = false;
          }
          if (!(_cusine==0 || _cusine == result.rows[i].cusinetypeid)) {
            validMenuFlag = false;
          }

          // filter array fields: tasteType [2]  == [2,4]
          var db_tasteType = result.rows[i].tastetypesid;
          for (var j=0; j< _tasteType.length; ++j) {
            var matchExists=false;
            if (db_tasteType) {
              for (var k=0; k< db_tasteType.length; ++k) {
                if (_tasteType[j] == db_tasteType[k]) {
                  matchExists=true;
                }
              }
            }
            if (!matchExists) {
              validMenuFlag=false;
            }
          }
          // filter array fields: ingredientTypesId
          var db_ingredienttypes = result.rows[i].ingredienttypesid;
          for (var j=0; j< _tasteType.length; ++j) {
            var matchExists=false;
            if (db_ingredienttypes) {
              for (var k=0; k< db_ingredienttypes.length; ++k) {
                if (_tasteType[j] == db_ingredienttypes[k]) {
                  matchExists=true;
                }
              }
            }
            if (!matchExists) {
              validMenuFlag=false;
            }
          }
          // filter array fields: sauceTypesId
          var db_suaceType = result.rows[i].saucetypesid;
          for (var j=0; j< _tasteType.length; ++j) {
            var matchExists=false;
            if (db_suaceType) {
              for (var k=0; k< db_suaceType.length; ++k) {
                if (_tasteType[j] == db_suaceType[k]) {
                  matchExists=true;
                }
              }
            }
            if (!matchExists) {
              validMenuFlag=false;
            }
          }

          if (validMenuFlag) {
            finalResult.push(result.rows[i]);
          }
        }
        console.log(finalResult);
        res.status(200).send(finalResult);
      }
    });
    done();
  });
});


////////////////////////////////////////////
//      GET APIs
///////////////////////////////////////////
// returns json object
app.get('/meal/all', function (request, response) {
  //console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM meal', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.status(200).send({"status":"SUCCESS", "result":result.rows}); }
    });
  });
});


///////////////////POST////////////////////////

//TODO: insert tasteTypeInfo, and foodTypeInfo
app.post('/uploadMeal', function (request, response) {
  //console.log("req.body = "+request.body);
  //console.log("restaurant id  = "+ request.body.restaurant_name);
  //console.log("offeredTimes = "+request.body.offeredTimes);
  if (!request.body.name || !request.body.picture_url) {
    console.log("upload meal failed: required fields null");
    response.status(200).send({"status":"FAIL: required fields null"});
    return;
  }
  if (!request.body.price) {
    request.body.price = 0;
  }
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO meal"+
                  "(restaurantId, name, chineseName, category, price, picture_url, "+
                  "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                  "tasteTypesId, ingredientTypesId, sauceTypesId, ingredientsDescription)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
                  [request.body.restaurant_name, request.body.name,
                    request.body.chineseMealName, request.body.category,
                    request.body.price, request.body.picture_url,
                    request.body.cuisineType, request.body.deliverySpeed,
                    request.body.offeredTimes, request.body.tasteTypes,
                    request.body.foodTypes, request.body.sauceTypes, request.body.ingredientsDescription],
                  function(err, result) {
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.status(200).send({"status":"SUCCESS"}); }
    });
    done();
  });

});



app.post('/admin_only_update_menu', function (req, res) {
  console.log("/admin_only_update_menu menuID = " + req.body.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("UPDATE meal SET ingredientsDescription = $2 "+
                  "WHERE meal.id = $1",
                  [req.body.menuId, req.body.ingredientsDescription],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu update result");
        console.log(result.rows);
        res.status(200).send({"status":"SUCCESS"});
      }
    });
    done();
  });
});


//
app.post('/deleteMeal', function (request, response) {
  //console.log("req.body = "+request.body);
  //console.log("restaurant id  = "+ request.body.restaurant_name);
  //console.log("offeredTimes = "+request.body.offeredTimes);
  if (!request.body.id) {
    console.log("delete meal failed: required fields null");
    response.json({"status":"FAIL: required fields null"});
    return;
  }
  if (!request.body.price) {
    request.body.price = 0;
  }
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("DELETE FROM meal WHERE id = $1",
                  [request.body.id],
                  function(err, result) {
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.status(200).send({"status":"SUCCESSS"}); }
    });
    done();
  });

});
