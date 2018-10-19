const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const knex = require('knex');

//Server Instantiation
const appServ = express();

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the app
//cors and helmet middlewares are not used
appServ.use(express.json(), logger('combined'), cors(), helmet());

//Root Request/Route Handler
appServ.get('/', (req, res) => {
    res.send('Test for root endpoint!')
});

//Post for Adding Projects Endpoint
server.post('/projects',(req, res) => {
    const { project } = req.body;
    if (!project) res.status(400).json({ error: 'Please provide a project' });
    db
      .insert({ project })
      .into('projects')
      .then(ids => res.status(201).json( ids))
      .catch(err => res.status(500).json({ error: 'Project cannot be saved' }));
  });
















//Port & Port Listener
const port = 6000;
appServ.listen(port, () => console.log(`\n Listening on ${port}`));