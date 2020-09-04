require('dotenv').config()
const express = require('express')
const logger = require('../logger')

const webhookRouter = express.Router()
const bodyParser = express.json()

const apikey = process.env.API_KEY
// const { webhook_container} = require('../store')

// I NEED TO CREATE A VARIABLE TO STORE THE JSON, THEN CLEAN IT AFTER EACH TIME

webhookRouter
  .route('/api/webhook')
    // .post(bodyParser, (req, res) => {
    //     const { webhook } = req.body
    //     console.log(webhook)
    //     webhook_container.push(webhook)
    //     console.log(webhook_container)
    // })

  .post(jsonParser, (req, res) => {
    const { webhook } = req.body
    console.log(req.body)
    console.log(webhook)
    const newSubmission = { webhook }

    let overall_score = newSubmission.fields[571475].value;
    let contact_email = newSubmission.fields[571477].value;
  
    const contact_body = {

         "properties": [
              {
                "property": "quiz_completed",
                "value": "true"
              },
              {
                "property": "quiz_score",
                "value": overall_score
              }
         ]
    }
    console.log(contact_body);

    axios({
         method: 'post',
         url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${contact_email}/?hapikey=${apikey}`,
         data: contact_body
         })  
         .then(function (response) {
              console.log(response);
         })
         .catch(function (error) {
              console.log(error);
         });

    newSubmission = {}
})


module.exports = webhookRouter