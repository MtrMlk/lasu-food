import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id parameter must be a valid string"),
  RestaurantController.getRestaurant
);

// api/restuarant/search/campus
router.get(
  "/search/:campus",
  param("campus")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Campus parameter must be a valid string"),
  RestaurantController.searchRestaurant
);

export default router;
