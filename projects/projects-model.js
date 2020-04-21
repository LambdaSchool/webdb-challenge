const db = require('../data/db-config.js');

function find() {
  return db('projects');
}
function findById(id) {
  return db('projects').where({ id }).first();
}

function addProject(projectData) {
  return db('projects')
    .insert(projectData);
}
function findProjectResources(id) {
  return db('project-resources as pr')
    .join('resources as r', 'r.id', 'pr.resource_id')
    .select('r.id', 'r.resource_name', 'r.resource_description')
    .where({ 'pr.project_id': id });
}

function findProjectTasks(id) {
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select('p.project_name', 'p.project_description', 't.id', 't.task_name', 't.completed')
    .where({ 'p.id': id });
}
function addResources(resource, id) {
  return db('resources as r')
    .join('project-resources as pr', 'pr.resource_id', 'r.id')
    .join('projects as p', 'p.id', 'pr.project_id')
    .select('p.id', 'r.resource_name', 'r.resource_description')
    .where({ 'pr.project_id': id })
    .insert(resource);
}
function update(change, id) {
  return db('projects').where({ id }).update(change);
}
function remove(id) {
  return db('projects')
    .where({ id }).del();
}

module.exports = {
  find,
  findById,
  addProject,
  findProjectResources,
  addResources,
  findProjectTasks,
  // findFullProject,
  update,
  remove,
};
