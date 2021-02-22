const express = require('express'); 
const SibApiV3Sdk = require('sib-api-v3-sdk');
const app = express(); 
require("dotenv").config(); 

// send email endpoint
app.post("/sendemail", (req, res, next) => {
    const email = req.query.email; 
    console.log(email); 
    let apikey = process.env.SIB_API_KEY 
    console.log(apikey)
    // auth + setup
    let defaultClient = SibApiV3Sdk.ApiClient.instance; 
    let apiKey = defaultClient.authentications['api-key']; 
    apiKey.apiKey = apikey; 

    // create contact 
    let apiInstance = new SibApiV3Sdk.ContactsApi(); 
    let createContact = new SibApiV3Sdk.CreateContact(); 
    createContact.email = email; 
    createContact.listIds = [2]; 

    // call SIB api 
    apiInstance.createContact(createContact).then((data) => {
        // success 
        res.status(200); 
        res.send("success");
    }, function (error) {
        // error
        console.log(error)
        res.status(500); 
        res.send("failure");
    })
})


// frontend endpoint 
app.use((req, res, next) => {
    res.sendFile(__dirname + "/index.html");
})


app.listen(5000, () => {
    console.log("app running on port 5000!")
})