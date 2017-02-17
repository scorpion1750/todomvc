var router=require("express").Router();

router.get('/',function(req,res){
    var name=req.query.name;
    res.render('test.html',{name:name});
});

module.exports=router;