var app=require('express')();
// var exphbs  = require('express-hbs');
// var routesLoader=require('express-routes-loader');
var boot = require('express-app-boot')(__dirname);
boot(app, 'boot');
// app.use(express.static(__dirname + '/public'));
// app.engine('html', exphbs.express3());
// app.set('view engine', 'html');
// app.set('views',__dirname + '/views');
// routesLoader(app,__dirname+'/routes');


// app.use(function(req,res,next){
//     next({statusCode:404});
// })

// app.use(function(err,req,res,next){

//     if(err&&err.statusCode==404){
//         res.render("404.html");
//         return;
//     }
//     console.log("Error Message",err,err.stack);
//     res.status(500).send('Server Error');


      

// })

app.start(function(){
    app.listen(3001);
});


app.get('appConfig')
