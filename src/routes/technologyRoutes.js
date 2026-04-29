import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId, validateRating, validateTechBody, validateUpdateTechBody } from '../middleware/validator.js';
import { getAllTechHandler, 
    getTechByIdHandler, rentTechByIdHandler, 
    reviewTechByIdHandler, createTechnologyHandler, 
    updateTechnologyHandler,
    deleteProductHandler} from '../controllers/technologyController.js';

const router = express.Router();
router.get('/',  getAllTechHandler);
router.get('/:id', validateId, getTechByIdHandler);
router.get('/rent/:id', authenticate, validateId, rentTechByIdHandler);

router.post('/review/:id', authenticate, validateId, validateRating, reviewTechByIdHandler);

router.post('/', authenticate, authorizeRoles('ADMIN'),  validateTechBody, createTechnologyHandler);

router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateId, validateUpdateTechBody, updateTechnologyHandler);


router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, deleteProductHandler);


export default router;