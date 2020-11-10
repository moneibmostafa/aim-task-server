const recipes = require('../models/recipes');

async function getAll(req, res) {

    console.log('get all recipes');

    return res.status(200).send({ message: 'Recipes Sent Successfully' });
}

module.exports = {
    getAll,
};