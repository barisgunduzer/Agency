const express = require('express');
const pageController = require('../controllers/pageController');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);

router.route('/add').post(projectController.createProject);
router.route('/edit/:id').put(projectController.updateProject);
router.route('/delete/:id').delete(projectController.deleteProject);

module.exports = router;