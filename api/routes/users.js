import express from 'express'
const router = express.Router();
import {auth} from '../middleware/auth.js'
import { addToCart, login, logout, register, removeFromCart } from '../controllers/users.js';

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history
  });
});

router.post("/register", register)
router.post("/login", login)
router.get("/logout", auth, logout)
router.post("/addToCart", auth, addToCart);
router.get('/removeFromCart', auth, removeFromCart)


export default router