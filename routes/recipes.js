const express = require('express');
const multer = require('multer'); 
const recipes = require('../controllers/recipesController');

const storage = multer.diskStorage({ 
    destination: function(req, file, cb) { 
        cb(null, './uploads/') 
    }, 
    filename: function(req, file, cb) { 
        cb(null, `${Date.now()}-${file.originalname}`); 
    } 
}); 
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('file'), recipes.create);
router.get('/', recipes.getAll);
router.get('/:id', recipes.getOne);
router.get('/mostViewed', recipes.mostViewed);
router.put('/:id', upload.single('file'), recipes.update);
router.delete('/:id', recipes.deleteRecipe);


module.exports = router;
