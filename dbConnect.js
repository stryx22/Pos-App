const mongoose = require('mongoose')
const URL =
  "mongodb+srv://shameik7203:duttatoffee@cluster0.6qh1wid.mongodb.net/Market_Place";
mongoose.connect(URL)

let connectObj = mongoose.connection
connectObj.on('connected' , () => {
    console.log("successful");
})

connectObj.on('error' , () =>{
    console.log('Failed');
}) 