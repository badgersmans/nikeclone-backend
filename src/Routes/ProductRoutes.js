import express from 'express';
import { 
    trendingProducts,
} from '../Controllers/ProductController.js';
import { authenticateAndAuthorize } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/trending", trendingProducts);

// router.get('/check-auth', authenticateAndAuthorize(), (req, res) => {
//     // If the request reaches here, it means the token is valid
//     res.status(200).json({ message: 'Authenticated' });
// });

export default router;