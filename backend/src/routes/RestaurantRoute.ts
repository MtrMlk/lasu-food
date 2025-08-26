import express from "express";
const router = express.Router();

// api/restuarant/search/city
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string")
);
