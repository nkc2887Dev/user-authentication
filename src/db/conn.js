const mongoose = require("mongoose")

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/Authentication")
.then(()=>console.log("MongoDB Successfully Connected !"))
.catch(err=>console.log(err));