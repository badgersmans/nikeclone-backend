import { verifyJWT } from "../Utils/jwtToken.js";
import User from "../Models/User.js";

const authenticateAndAuthorize = () => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];

            // Check if Authorization header exists and starts with 'Bearer'
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: Missing or invalid token." });
            }

            const token = authHeader.split(" ")[1];

            // Verify JWT token
            const decodedToken = verifyJWT(token);
            if (!decodedToken) {
                return res.status(401).json({ message: "Unauthorized: Invalid token." });
            }

            // Find the user by the decoded ID from the token
            const user = await User.findById(decodedToken.id);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Attach user information to the request object
            req.user = {
                id: user._id.toString(),
            };

            // Proceed to the next middleware or route handler
            return next();
        } catch (error) {
            console.error("Authentication error:", error);
            return res.status(401).json({ message: error.message });
        }
    };
};

export { authenticateAndAuthorize };