const { Recipe } = require('../models/recipes');
const { validate } = require('../validation/recipeValidation');

async function create(req, res) {
    const recipeObject = {
        title: req.body.title,
        creatorName: req.body.creatorName,
        servings: req.body.servings,
        description: req.body.description,
        nutritionFacts: req.body.nutrition,
        ingredients: req.body.ingredients,
        recipeSteps: req.body.recipeSteps,
        // images,
    }

    const validationErrors = validate(recipeObject);
    if (validationErrors) {
        return res.status(400).send({
            message: 'Failed to create post',
            error: validationErrors,
        });
    }

    try {
        const recipe = new Recipe(recipeObject);
        await recipe.save(); 
        return res.status(200).send({ message: 'Recipe Submitted Successfully', recipe });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
}

async function getAll(req, res) {
    try {
        const recipes = await Recipe.find().lean();
        if (recipes.length === 0) return res.status(404).send({ message: 'No recipes found!' });
        return res.status(200).send({ message: 'Recipes Sent Successfully', recipes });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
}

async function getOne(req, res) {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id).lean();
        if (!recipe) return res.status(404).send({ message: 'No recipe found!' });
        return res.status(200).send({ message: 'Recipe Sent Successfully', recipe });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
}

async function mostViewed(req, res) {
    const recipes = await Recipe.find().sort({ views: -1 }).select(3).lean();
    if (recipes.length === 0) return res.status(404).send({ message: 'No recipes found!' })

    return res.status(200).send({ message: 'Recipes Sent Successfully', recipes });
}

async function update(req, res) {
    const { id } = req.params;
    
    const recipeObject = {
        title: req.body.title,
        creatorName: req.body.creatorName,
        servings: req.body.servings,
        description: req.body.description,
        nutritionFacts: req.body.nutrition,
        ingredients: req.body.ingredients,
        recipeSteps: req.body.recipeSteps,
        // images,
    }

    const validationErrors = validate(recipeObject);
    if (validationErrors) {
        return res.status(400).send({
            message: 'Failed to create post',
            error: validationErrors,
        });
    }

    try {
        const recipe = await Recipe.updateOne({ _id: id }, recipeObject);
        return res.status(200).send({ message: 'Recipe Updated Successfully', recipe });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
}

async function deleteRecipe(req, res) {
    const { id } = req.params;

    try {
        await Recipe.deleteOne({ _id: id });
        const recipes = await Recipe.find().lean();
        return res.status(200).send({ message: 'Recipe Deleted Successfully', recipes });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }    
}

module.exports = {
    create,
    getAll,
    getOne,
    mostViewed,
    update,
    deleteRecipe,
};