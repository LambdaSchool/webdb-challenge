const express = require("express");
const Projects = require("./model");
const router = express.Router();

//retrieving a list of projects.
router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      const updated = projects.map(project => {
        if (project.completed === 0) {
          project.completed = false;
        } else if (project.completed === 1) {
          project.completed = true;
        }
        return project;
      });
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not get projects" });
    });
});

//adding projects
// POST /api/projects endpoint for Adding projects - TESTED
router.post("/", (req, res) => {
  const projectToAdd = { ...req.body, completed: 0 };
  Projects.addProject(projectToAdd)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not create new project" });
    });
});

//STRETCH
//getting project by ID
router.get("/:id", (req, res) => {
  Projects.getProjectById(req.params.id)
    .then(project => {
      if (project) {
        const updated = {
          ...project,
          completed: project.completed === 1 ? true : false
        };
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Could not find project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not get project" });
    });
});

module.exports = router;
