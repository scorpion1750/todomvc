var router = require('express').Router();
router.get("/",function(req,res){

    res.render("todolist.html");
})


module.exports=router;