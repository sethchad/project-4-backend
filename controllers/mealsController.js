const express = require("express");
const router = express.Router();

const MealModel = require("../models").Meal;
const IngredientModel = require("../models").Ingredient;


// GET ALL MEALS
router.get("/", async (req, res) => {
  let meals = await MealModel.findAll({
    include: IngredientModel, 
    order: [
      [ 'id', 'asc' ],
      [ IngredientModel, 'id', 'asc' ]
    ] 
  });
  res.json({ meals });
});

// CREATE MEAL
router.post("/", async (req, res) => {
  let meal = await MealModel.create(req.body);
  res.json({ meal });
}); 

// CREATE INGREDIENT
router.post("/:id/newingredient", async (req, res) => {
  let meal = await MealModel.findByPk(req.params.id)
  let ingredient = await meal.createIngredient(req.body);
  
  res.json({ meal, ingredient });
}); 

// UPDATE MEAL
router.put("/:id", async (req, res) => {
  let updateMeal = await MealModel.update(req.body, {
    where: { id: req.params.id },
    returning: true
  });
  let meal = await MealModel.findByPk(req.params.id, {
    include: IngredientModel,
  });
  res.json({ meal })
})

// DELETE INGREDIENT
router.delete("/:id/deleteingredient", async (req, res) => {
  try {
    await IngredientModel.destroy({
      where: { id: req.params.id },
    });
  } catch(e) {
    res.json({ message: "ERROR: Ingredient could not be deleted", e})
  }
});

// DELETE MEAL
router.delete("/:id", async (req, res) => {
  try {
    await MealModel.destroy({
      where: { id: req.params.id },
    });
    await IngredientModel.destroy({
      where: { mealId: req.params.id }
    })
    res.json({ 
      message: `Meal ID ${req.params.id} has been deleted`
    });
  } catch(e) {
    res.json({ message: "Could not delete meal"})
  }
});


module.exports = router;
