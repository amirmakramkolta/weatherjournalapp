const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
//get the website front-end files
app.use(express.static('website'));
//end point
const projectData = []
//post user response 
app.post('/add',(req,res)=>{
  newEntry={
    temp: req.body.tempCelsius,
    date: req.body.date,
    userRes: req.body.userRes
  }
  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData)
})

//set a port
const port = 5000;
const server = app.listen(port,()=>{console.log(`running on http://localhost:${port}`)});


