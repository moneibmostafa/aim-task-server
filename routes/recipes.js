const express = require('express');
const recipes = require('../controllers/recipesController');

const router = express.Router();

router.get('/', recipes.getAll);
// router.get('/:id', recipes.getRecipe);
// router.post('/', recipes.createRecipe);
// router.put('/:id', recipes.updateRecipe);
// router.delete('/:id', recipes.deleteRecipe);

module.exports = router;
