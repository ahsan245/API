const categoryController = require("../controllers/categories.controller");
const techController = require("../controllers/techs.controller");
const userController = require("../controllers/users.controller");
const sliderController = require("../controllers/slider.controller");

const express = require("express");
const { slider } = require("../models/slider.model");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);



router.post("/tech", techController.create);
router.get("/tech", techController.findAll);
router.get("/tech/:id", techController.findOne);
router.put("/tech/:id", techController.update);
router.delete("/tech/:id", techController.delete);

router.post("/slider", sliderController.create);
router.get("/slider", sliderController.findAll);
router.get("/slider/:id", sliderController.findOne);
router.put("/slider/:id", sliderController.update);
router.delete("/slider/:id", sliderController.delete);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;