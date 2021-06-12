const express=require('express');
const router=express.Router();
const Post= require("../models/Post");


router.get('/count', async (req,res)=>{
    try{
        let limit=Number(req.query.limit); 
        console.log(limit);
        if(!Number.isNaN(limit) && limit!==0) {
            const Postdata= await Post.find().limit(limit);
            res.send(Postdata);
        } else { 
        res.send("invalid Limit");
        }
     }
    catch (err){
        res.json({message: err});
    }
});

router
.get('/', (req,res)=>{ 
        res.send("please provide full path");
})
.post('/',(req,res)=>{
    const post=new Post({
        title:req.body.title,
        discription:req.body.discription
    });
    post.save()
    .then(data=>{res.json(data);})
    .catch(err=>{res.json({message:err});})

    console.log(req.body);
});
router.delete('/', (req,res)=>{
      
    Post.findOneAndRemove( {title:"test"})
       .then(data=>{res.json(data);})
       .catch(err=>{res.json({message:err});})
   
});
module.exports = router;