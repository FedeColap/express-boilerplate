// require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// const axios = require('axios')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
// const webhook = require('./test-webhook.json')
// const { webhook_container } = require('../store')
const webhookRouter = require('./webhook/webhook-router')

const app = express()

const morganOption = (NODE_ENV === 'production')? 'tiny': 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(webhookRouter)


// const apikey = process.env.API_KEY

app.get('/', (req, res) => {

     // making an endpoint per ospitare il json webhook?
     // console.log(apikey);
     // let webhook_c = {...webhook};
     // let overall_score = webhook_c.fields[571475].value;
     // let contact_email = webhook_c.fields[571477].value;
     // let webhook_c = {...webhook_container};
     // let overall_score = webhook_c.fields[571475].value;
     // let contact_email = webhook_c.fields[571477].value;
   
     // const contact_body = {

     //      "properties": [
     //           {
     //             "property": "quiz_completed",
     //             "value": "true"
     //           },
     //           {
     //             "property": "quiz_score",
     //             "value": overall_score
     //           }
     //      ]
     // }
     // console.log(contact_body);

     // axios({
     //      method: 'post',
     //      url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${contact_email}/?hapikey=${apikey}`,
     //      data: contact_body
     //      })  
     //      .then(function (response) {
     //           console.log(response);
     //      })
     //      .catch(function (error) {
     //           console.log(error);
     //      });;


     res.send('Fede, Speranza e Carita')
})



app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
   } else {
        console.error(error)
        response = { message: error.message, error }
   }
   res.status(500).json(response)
})

module.exports = app;
