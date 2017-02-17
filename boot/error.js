module.exports = function(app, params){
    app.use(function(req,res,next){
        next({statusCode:404});
    });

    app.use(function(err,req,res,next){

        if(err&&err.statusCode==404){
            res.render("404.html");
            return;
        }
        console.log("Error Message",err,err.stack);
        res.status(500).send('Server Error');


        

    });
};