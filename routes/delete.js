const express= require("express");
const router= express.Router();
const Post= require("../models/Post");


router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Post.findOneAndRemove( {_id: req.params.id})
    .then(data=>{res.json(data);})
    .catch(err=>{res.json({message:err});})
})

module.exports = router;