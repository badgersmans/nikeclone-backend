// Import the SecretsManager class
import SecretsManager from './BitwardenSecretsManager.js';

// Initialize SecretsManager instance
const secretsManager = new SecretsManager();

async function test() {
    // Test the connection
    const connected = await secretsManager.connect();
    console.log("Connected:", connected);

    if (connected) {
        // If connected, test listing secrets
        const secrets = await secretsManager.list();
        console.log("Secrets:", secrets);

        // Optionally test fetching a specific secret by ID
        if (secrets && secrets.length > 0) {
            const secret = await secretsManager.get(secrets[0].id); // Get the first secret as an example
            console.log("Fetched secret:", secret);
        }
    }
}

test().catch(error => console.error("Error during test:", error));
