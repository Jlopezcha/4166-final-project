import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId, validateRating, validateBooksBody, validateUpdateBooksBody } from '../middleware/validator.js';
import { getAllBooksHandler, getBooksByIdHandler, 
    rentBookByIdHandler, reviewBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from '../controllers/bookController.js';


const router = express.Router();
router.get('/',  getAllBooksHandler);
router.get('/:id', validateId, getBooksByIdHandler);
router.get('/rent/:id', authenticate, validateId, rentBookByIdHandler);
router.post('/review/:id', authenticate, validateId, validateRating, reviewBookByIdHandler);

router.post('/', authenticate, authorizeRoles('ADMIN'),  validateBooksBody, createBookHandler);

router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateId, validateUpdateBooksBody, updateBookHandler);


router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, deleteBookHandler);


export default router;