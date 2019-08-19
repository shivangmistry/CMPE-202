const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require("./models/user")
const Order = require("./models/order")
require("./mongoose");

const app = express()
const origin = "http://localhost:3000"
const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/login", (req, res) => {
    // console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email }, 'password' , function (err, result) {
        if (err) {  res.json({ message: "Something went wrong." }) }
        else if(!result) { res.json({ message: "No User Found."}) }
        else if(result.password===password) { res.json({ message: "success"}) }
        else{
            res.json({ message: "Incorrect Pasword."})
        }
    })
})

app.post("/signup", (req, res) => {
    // console.log(req.body)
    var newuser = new User();
    newuser.username = req.body.name;
    newuser.email = req.body.email;
    newuser.password = req.body.password;

    newuser.save((err, savedUser) => {
        if (err)  res.json({ message: "error"})
        else res.json({ message: "success"})
    })

})

app.get("/profile", (req, res) => {
    // console.log(req.body)
    User.findOne({ email: req.query.email })
    .exec(function (error, user) {
        if (error) res.json({ message: "error" })
        else {
            if (user === null) res.json({ message: "unauthorised"})
            else res.json({message:"success", data:user })
        }
    });
})

app.post("/addcard", (req, res) => {
    const data = req.body
    // console.log("Data: ",data)
    User.findOneAndUpdate({ email: data.email }, { $set: { cardno: data.cardno } }, (err,result) => {
        if(err) res.json({ message: "error"})
        else{
            User.findOneAndUpdate({ email: data.email }, { $set: { cvv : data.cvv } }, (err, result) => {
                User.findOneAndUpdate({ email: data.email }, { $set: { amount : "20.00" } }, (err, result) => {
                    // console.log(result)
                    if(err) res.send({ message: "error"})
                    else res.json({ message: "success"})
                })
            })
        }
    })
})

app.post("/postpayment", (req, res) => {
    // console.log(req.body)
    const data = req.body
    User.findOneAndUpdate({ email: data.email}, { $set : { amount: data.amount}}, (err,result) => {
        if(err) res.json({ message: "error"})
        else{
            const order = new Order({
                email: data.email,
                item: data.item,
                time: data.time
            })
            order.save((err, result) => {
                if(err) res.json({ message: "error"})
                else res.json({ message: "success" })
            })
        }
    })
})

app.get("/orders", (req, res) => {
    // console.log(req.query.email)
    Order.find({ email: req.query.email},'item time', (err, result) => {
        // console.log(result)
        if(err) res.json({ message: "error"})
        else res.json({ message: "success", data: result })
    })
})

app.listen( port, () => console.log("Server started on port ", port))
