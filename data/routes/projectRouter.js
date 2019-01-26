const express = require("express")
const router = express.Router() 
const projDB = require('../helpers/projectsDB')

router.get('/', (req, res) => {
 projDB.pull()
  .then((projects) => {
   res
    .json(projects)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error getting projects from DB."})
  })
})

router.get('/:id', (req, res) => {
 const { id } = req.params 
 projDB.pullById(id)
  .then((project) => {
   res
    .json(project)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error getting project from DB."})
  })
})

router.post('/', (req, res) => {
 const project = req.body 
 if (project.name && project.description) {
  projDB.place(project)
   .then(() => {
    res
     .status(201)
     .json(project)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error "})
   })
 }
 else {
  res
   .json({error: "Name and description required for project."})
 }
})

router.put('/', (req, res) => [

])

router.delete('/', (req, res) => {

})

module.exports = router 

