import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId, validateRating, validatePapersBody, validateUpdatePapersBody } from '../middleware/validator.js';
import { getAllPapersHandler, getPapersByIdHandler, 
    rentPaperByIdHandler, reviewPaperByIdHandler, createPaperHandler, updatePaperHandler, deletePaperHandler } from '../controllers/researchController.js';

const router = express.Router();
router.get('/',  getAllPapersHandler);
router.get('/:id', validateId, getPapersByIdHandler);
router.get('/rent/:id', authenticate, validateId, rentPaperByIdHandler);
router.post('/review/:id', authenticate, validateId, validateRating, reviewPaperByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'),  validatePapersBody, createPaperHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateId, validateUpdatePapersBody, updatePaperHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, deletePaperHandler);


export default router;