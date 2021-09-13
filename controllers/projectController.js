const Project = require('../models/Project');
const fs = require('fs');

exports.createProject = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    try {
      await Project.create({
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
      });

      res.status(200).redirect('/#ourportfolio');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  });
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.title = req.body.title;
    project.description = req.body.description;
    project.save();

    res.status(200).redirect('/#ourportfolio');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    let deletedImage = __dirname + '/../public' + project.image;
    fs.unlinkSync(deletedImage);
    await Project.findByIdAndRemove(req.params.id);
    res.status(200).redirect('/#ourportfolio');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
