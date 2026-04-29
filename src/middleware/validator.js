import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];


export const validateRating = [
  body('rating')
    .exists({values: 'falsy'})
    .withMessage('Rating is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be a numeric value from 1-10'),

    handleValidationErrors,
]

export const validateTechBody = [
  body('product_name')
    .exists({values: 'falsy'})
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({min: 4, max: 250})
    .withMessage('Name must be from 4-250 characters'),


  body('category')
    .isArray({min: 1})
    .bail()
    .withMessage('Category must have at least one - a non empty array'),
  
  body('category.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each category must be a non empty string'),

  body('availability')
    .exists({values: 'falsy'})
    .withMessage('Availability is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Availability must be at least 1'),

  body('product_year')
    .exists({values: 'falsy'})
    .withMessage('Product year is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 2000})
    .withMessage('Products must be from at least year 2000 and up'),

  body('avg_rating')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be an integer from 1-10'),

  body('total_reviews')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('Total reviews must be a number'),

    handleValidationErrors,
]


export const validateUpdateTechBody = [
  body('product_name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({min: 4, max: 250})
    .withMessage('Name must be from 4-250 characters'),


  body('category')
    .optional()
    .isArray({min: 1})
    .bail()
    .withMessage('Category must have at least one - a non empty array'),
  
  body('category.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each category must be a non empty string'),

  body('availability')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Availability must be at least 1'),

  body('product_year')
    .optional()
    .trim()
    .escape()
    .isInt({min: 2000})
    .withMessage('Products must be from at least year 2000 and up'),

  body('avg_rating')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be an integer from 1-10'),

  body('total_reviews')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('Total reviews must be a number'),

    handleValidationErrors,
]

export const validateBooksBody = [
  body('name')
    .exists({values: 'falsy'})
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({min: 4, max: 300})
    .withMessage('Name must be from 4-300 characters'),


  body('authors')
    .isArray({min: 1})
    .bail()
    .withMessage('Authors must have at least one - a non empty array'),
  
  body('authors.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each author name must be a non empty string'),

  body('genre')
    .isArray({min: 1})
    .bail()
    .withMessage('Genre must have at least one - a non empty array'),
  
  body('genre.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each genre must be a non empty string'),

  body('availability')
    .exists({values: 'falsy'})
    .withMessage('Availability is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Availability must be at least 1'),

  body('avg_rating')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be an integer from 1-10'),

  body('total_reviews')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('Total reviews must be a number'),

    handleValidationErrors,
]

export const validateUpdateBooksBody = [
  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({min: 4, max: 300})
    .withMessage('Name must be from 4-300 characters'),


  body('authors')
    .optional()
    .isArray({min: 1})
    .bail()
    .withMessage('Authors must have at least one - a non empty array'),
  
  body('authors.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each author name must be a non empty string'),

  body('genre')
    .optional()
    .isArray({min: 1})
    .bail()
    .withMessage('Genre must have at least one - a non empty array'),
  
  body('genre.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each genre must be a non empty string'),

  body('availability')
    .optional()
    .exists({values: 'falsy'})
    .withMessage('Availability is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Availability must be at least 1'),

  body('avg_rating')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be an integer from 1-10'),

  body('total_reviews')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('Total reviews must be a number'),

    handleValidationErrors,
]

export const validatePapersBody = [
  body('name')
    .exists({values: 'falsy'})
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({min: 4, max: 300})
    .withMessage('Name must be from 4-300 characters'),


  body('authors')
    .isArray({min: 1})
    .bail()
    .withMessage('Authors must have at least one - a non empty array'),
  
  body('authors.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each author name must be a non empty string'),

  body('topic')
    .isArray({min: 1})
    .bail()
    .withMessage('Topic must have at least one - a non empty array'),
  
  body('topic.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each topic must be a non empty string'),

  body('availability')
    .exists({values: 'falsy'})
    .withMessage('Availability is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Availability must be at least 1'),

  body('avg_rating')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be an integer from 1-10'),

  body('total_reviews')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('Total reviews must be a number'),

    handleValidationErrors,
]

export const validateUpdatePapersBody = [
  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({min: 4, max: 300})
    .withMessage('Name must be from 4-300 characters'),


  body('authors')
    .optional()
    .isArray({min: 1})
    .bail()
    .withMessage('Authors must have at least one - a non empty array'),
  
  body('authors.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each author name must be a non empty string'),

  body('topic')
    .optional()
    .isArray({min: 1})
    .bail()
    .withMessage('Topic must have at least one - a non empty array'),
  
  body('topic.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each topic must be a non empty string'),

  body('availability')
    .optional()
    .exists({values: 'falsy'})
    .withMessage('Availability is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Availability must be at least 1'),

  body('avg_rating')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1, max: 10})
    .withMessage('Rating must be an integer from 1-10'),

  body('total_reviews')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('Total reviews must be a number'),

    handleValidationErrors,
]