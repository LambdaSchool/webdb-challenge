const db = require('../dbConfig');

module.exports = {
// Getting all the projects
getProjects: () => {
    const query = db('project');
    return query.then(projects => {
        return projects.map(project => {
            return {
                ...project,
                completed: project.completed ? true : false
            }
        })
    })
},

// retrieve a project by its id that returns an object
getProject: (id) => {
    const project = db('project')
                    .where('id', id);
    const action = db('action')
                    .where('project_id', id)
                    .select('id', 'description', 'notes', 'completed');

    const joining = [project, action];

    return Promise.all(joining)
        .then(response => {
            const [projects, actions] = response;

            if (projects.length === 0) {
                return 0
            } else {
                projects.forEach(project => 
                    project.completed = project.completed ? true : false
                )
            }
            if (actions.length !== 0) {
                actions.forEach(action => 
                    action.completed = action.completed ? true : false
                )
            }
            return {
                ...projects[0], actions
            }
        })
},

// Posting a new project
addProject: (project) => {
    return db('project')
        .insert(project)
},

// Updating project
updateProject: (id, updatedProject) => {
    return db('project')
            .where('id', id)
            .update(updatedProject)
},

deleteProject: (id) => {
    return db('project')
            .where('id', id)
            .delete()
},

}