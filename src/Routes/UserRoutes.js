import express from 'express';
import { 
    loginUser,
    resetPassword,
    registerUser,
    verifyCode,
    resendVerificationCode,
    verifyResentCode,
} from '../Controllers/UserController.js';
import { registerToken } from '../Controllers/BitwardenController.js';
import { authenticateAndAuthorize } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/passwordless/register/token", registerToken);

router.post("/verify", verifyCode);
router.post("/verifyagain", resendVerificationCode);
router.post("/verifyresentcode", verifyResentCode);

router.post("/login", loginUser);
router.post("/resetpassword", resetPassword);

router.get('/check-auth', authenticateAndAuthorize(), (req, res) => {
    // If the request reaches here, it means the token is valid
    res.status(200).json({ message: 'Authenticated' });
});

export default router;