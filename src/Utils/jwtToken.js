import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "fallback jwt token";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h"; // Default to 1 hour if not set

/**
 * Generate a JWT
 * @param {object} payload - The payload to include in the token
 * @param {string} [expiresIn] - Expiration time for the token (optional, overrides default)
 * @returns {string} A signed JWT string
 */
const generateJWT = (payload, expiresIn = JWT_EXPIRATION) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT
 * @param {string} token - The JWT string to verify
 * @returns {object} The decoded payload if the token is valid
 * @throws {Error} If the token is invalid or expired
 */
/**
 * Verify a JWT
 * @param {string} token - The JWT string to verify
 * @returns {object} The decoded payload if the token is valid
 * @throws {Error} If the token is invalid or expired
 */
const verifyJWT = (token) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    try {
        // Verifying the token using the JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        // Ensure the decoded value is an object
        if (typeof decoded === "object" && decoded !== null) {
            return decoded;  // Return the decoded payload
        } else {
            throw new Error("Unexpected token format.");
        }
    } catch (error) {
        // Provide more specific error messages based on the error
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Token has expired.");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token.");
        }
        throw new Error("Token verification failed.");
    }
};

export { generateJWT, verifyJWT };