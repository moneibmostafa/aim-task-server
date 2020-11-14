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

    const recipe = new Recipe(recipeObject);

    await recipe.save(); 
    return res.status(200).send({ message: 'Recipe Submitted Successfully', recipe });
}

async function getAll(req, res) {
    const recipes = await Recipe.find().lean();
    if (recipes.length === 0) return res.status(404).send({ message: 'No recipes found!' })

    return res.status(200).send({ message: 'Recipes Sent Successfully', recipes });
}

async function getOne(req, res) {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).lean();
    if (!recipe) return res.status(404).send({ message: 'No recipe found!' })

    return res.status(200).send({ message: 'Recipe Sent Successfully', recipe });
}

async function mostViewed(req, res) {
    const recipes = await Recipe.find().sort({ views: -1 }).select(3).lean();
    if (recipes.length === 0) return res.status(404).send({ message: 'No recipes found!' })

    return res.status(200).send({ message: 'Recipes Sent Successfully', recipes });
}

async function mostLiked(req, res) {
    const recipes = await Recipe.find().sort({ likes: -1 }).select(3).lean();
    if (recipes.length === 0) return res.status(404).send({ message: 'No recipes found!' })

    return res.status(200).send({ message: 'Recipes Sent Successfully', recipes });
}

async function mostDisliked(req, res) {
    const recipes = await Recipe.find().sort({ dislikes: -1 }).select(3).lean();
    if (recipes.length === 0) return res.status(404).send({ message: 'No recipes found!' })

    return res.status(200).send({ message: 'Recipes Sent Successfully', recipes });
}

async function update(req, res) {

    const { id } = req.params;
    const {} = req.body;

    const recipe = await Recipe.findById(id).lean();
    // const recipe = new Recipe({
    //     title,
    //     creatorName,
    //     servings,
    //     description,
    //     nutritionFacts,
    //     ingrediants,
    //     steps,
    //     images,
    // })

    await recipe.save(); 
    return res.status(200).send({ message: 'Recipe Updated Successfully', recipe });
}

async function update(req, res) {

    const { id } = req.params;
    const {} = req.body;

    const recipe = await Recipe.findById(id).lean();
    // const recipe = new Recipe({
    //     title,
    //     creatorName,
    //     servings,
    //     description,
    //     nutritionFacts,
    //     ingrediants,
    //     steps,
    //     images,
    // })

    await recipe.save(); 
    return res.status(200).send({ message: 'Recipe Updated Successfully', recipe });
}

module.exports = {
    create,
    getAll,
    getOne,
    mostViewed,
    update,
};