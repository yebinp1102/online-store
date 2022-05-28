import express from 'express';
import { getProducts, getProductsById, postImage, saveProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/image', postImage);
router.post('/', saveProduct);
router.post('/products', getProducts);
router.get('/products_by_id', getProductsById);

export default router