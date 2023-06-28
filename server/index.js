const express = require("express");
const cors = require("cors");
const { MongoClient }=require("mongodb");

const app =express();
app.use(cors());
app.use(express.json());


app.post("/save",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    MongoClient.connect(url,(err,database)=>{
        if(err){
            console.log(err);
        }else{
            const dbo=database.db("sms_23june23");
            const doc ={"_id":req.body.rno,"name":req.body.name,"marks":req.body.marks};
            dbo.collection("student").insertOne(doc,(err,result)=>{
                if(err)res.send(err);
                else res.send(result);
            })
        }
    })
})



app.get("/read",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    MongoClient.connect(url,(err,database)=>{
        if(err){
            console.log(err);
        }else{
            const dbo=database.db("sms_23june23");
            dbo.collection("student").find({}).toArray((err,result)=>{
                if(err)res.send(err);
                else res.send(result);
            })
        }
    })
})

app.delete("/remove",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    MongoClient.connect(url,(err,database)=>{
        if(err){
            console.log(err);
        }else{
            const dbo=database.db("sms_23june23");
            const doc ={"_id":req.body.rno,};
            dbo.collection("student").deleteOne(doc,(err,result)=>{
                if(err)res.send(err);
                else res.send(result);
            })
        }
    })
})

app.put("/modify",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    MongoClient.connect(url,(err,database)=>{
        if(err){
            console.log(err);
        }else{
            const dbo=database.db("sms_23june23");
            const search ={"_id":req.body.rno};
            const ndata={$set:{"name":req.body.name,"marks":req.body.marks}}
            dbo.collection("student").updateOne(search,ndata,(err,result)=>{
              
                if(err)   res.send(err);
                else       res.send(result);
            })
        }
    })
})

app.listen(9000,()=>{console.log("server ready")});