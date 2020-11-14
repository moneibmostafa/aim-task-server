const express = require('express');
const recipes = require('../controllers/recipesController');

const router = express.Router();

router.post('/', recipes.create);
router.get('/', recipes.getAll);
router.get('/:id', recipes.getOne);
router.get('/mostViewed', recipes.mostViewed);
router.put('/:id', recipes.update);
router.delete('/:id', recipes.deleteRecipe);


module.exports = router;
