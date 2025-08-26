import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("Restaurant name is required!")
    .isString()
    .withMessage("Restaurant name must be a string"),
  body("shopNumber")
    .optional()
    .isString()
    .withMessage("Shop number must be a string if provided"),
  // Required shop address
  body("shopAddress")
    .notEmpty()
    .withMessage("Shop address is required!")
    .isString()
    .withMessage("Shop address must be a string"),
  // Required shop location
  body("shopLocation")
    .notEmpty()
    .withMessage("Shop location is required!")
    .isString()
    .withMessage("Shop location must be a string"),
  // Required campus with enum validation
  body("campus")
    .notEmpty()
    .withMessage("Campus is required!")
    .isIn(["ojo", "epe"])
    .withMessage("Campus must be either 'ojo' or 'epe'")
    .toLowerCase()
    .withMessage("Campus will be converted to lowercase"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("estimatedDeliveryTime must be a positive integer!"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array!")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty!"),
  body("menuItems").isArray().withMessage("Menu Items Must Be An Array!"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu Item Name Is Required!"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Price Is Required And Must Be A Positive Number!"),
  handleValidationErrors,
];
