const Project = require('../models/Project');

exports.getIndexPage = async (req, res) => {
    
    const projects = await Project.find();

    res.render('index', {
        projects
    });
}
