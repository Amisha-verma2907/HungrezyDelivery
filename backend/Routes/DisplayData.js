const express = require("express");
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
      //console.log(global.food_items,global.foodCategory);
      let response = global.food_items;
      let response2=global.foodCategory;
      res.send([response,response2]);
    }catch(err){
        console.error(err.message);
        res.send("Server error");
    }
})

module.exports = router;