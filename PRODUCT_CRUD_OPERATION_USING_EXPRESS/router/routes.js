const express=require('express');
const app = require('../app');
const router =express.Router();
const db = require('../db/dbconnection');


router.get('/showproducts',(req,res)=>{
   db.query("select * from product",(err,data)=>{
        if(err){
            res.status(500).send("data not found "+JSON.stringify(err));
        }else{
            res.render('index',{productdata:data});
        }
   })
})

router.get('/addproducts',(req,res)=>{
    res.render('addemptyform');
})


router.post('/insertproducts',(req,res)=>{
    console.log(req.body);
    let pid=req.body.pid;
    let pname = req.body.pname;
    let pquanti=req.body.pquanti;
    db.query("insert into product values(?,?,?)",[pid,pname,pquanti],(err,data)=>{
        if(err){
            res.status(500).send("not inserted properly"+JSON.parse(err));
        }else{
            res.redirect('/showproducts');
        }
    })
})

router.get('/delete/:pid',(req,res)=>{
    let pid = req.params.pid;
    db.query("delete from product where pid = ?",[pid],(err,data)=>{
        if(err){
            res.status(500).send("product not deleted error occuring "+JSON.stringify(err));
        }else{
            res.redirect('/showproducts');
        }
    })
})

router.get('/edit/:pid',(req,res)=>{
    db.query('select * from product where pid=?',[req.params.pid],(err,data)=>{
        if(err){
            res.status(500).send("something went wrong"+JSON.stringify(err));
        }else{
           res.render("editableform",{prod:data[0]});
        }
    })
})

router.post('/updateproductdetails',(req,res)=>{
   let pid = req.body.pid;
   let pname=req.body.name;
   let pquanti = req.body.quanti;
   db.query('update product set pname=?,pquanti=? where pid=?',[pname,pquanti,pid],(err,data)=>{
    if(err){
        res.status(500).send('invalid details'+JSON.stringify(err));
    }else{
        res.redirect('/showproducts');
    }
   })
})

module.exports=router;