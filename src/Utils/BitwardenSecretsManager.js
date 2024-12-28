import dotenv from 'dotenv';
// import { BitwardenClient, DeviceType } from "@bitwarden/sdk-napi";
// import { LogLevel } from "@bitwarden/sdk-napi/binding.js";


dotenv.config()

// Optional settings
// const settings = {
//   apiUrl: "https://api.bitwarden.com",
//   identityUrl: "https://identity.bitwarden.com",
//   userAgent: "Bitwarden SDK",
//   deviceType: DeviceType.SDK,
// };

const accessToken = process.env.BITWARDEN_SECRETS_MANAGER_API;
const orgId = process.env.BITWARDEN_ORGANIZATION_ID;
console.log(`wtf is orgid? ${orgId}`)
const stateFile = "../../authState.bw"; // so that we don't have to login everytime (reuse the auth)

// const client = new BitwardenClient(settings, LogLevel.Trace);

// Authenticating using a machine account access token
// await client.auth().loginAccessToken(accessToken, stateFile);

// List secrets
// const secrets = await client.secrets().list(orgId);
// console.log(`bitwarden secrets list ${secrets}`)

// Get a specific secret
// const secret = await client.secrets().get("secret-id");
// console.log(`bitwarden secret ${secrets}`)


// const { BitwardenClient, DeviceType } = require('@bitwarden/sdk-napi');
// const { LogLevel } = require('@bitwarden/sdk-napi/binding');

import { BitwardenClient, DeviceType } from "@bitwarden/sdk-napi";
import { LogLevel } from "@bitwarden/sdk-napi/binding.js";

export default class SecretsManager {
    constructor() {
        this.settings = {
            apiUrl: "https://api.bitwarden.com",
            identityUrl: "https://identity.bitwarden.com",
            userAgent: "Bitwarden SDK",
            deviceType: DeviceType.SDK,
        };
        this.accessToken = process.env.BITWARDEN_ACCESS_TOKEN; // Use process.env for environment variables
        this.organizationID = process.env.BITWARDEN_ORGANIZATION_ID;
        this.client = null;
    }

    async connect() {
        if (!this.accessToken) {
            console.error("Access token is missing.");
            return false;
        }
        this.client = new BitwardenClient(this.settings, LogLevel.Trace);
        try {
            // const result = await this.client.auth().loginAccessToken(this.accessToken, stateFile);
            const result = await this.client.auth().loginAccessToken(process.env.BITWARDEN_ACCESS_TOKEN);


        // Log the result to inspect the response
        console.log("Authentication result???????????:", result);
            return result;
        } catch (error) {
            console.error("Failed to authenticate with access token:", error);
            return false;
        }
    }

    async list() {
        if (!this.organizationID || !this.client) {
            console.error("Client or organization ID is missing.");
            return undefined;
        }
        try {
            return await this.client.secrets().list(this.organizationID);
        } catch (error) {
            console.error("Failed to list secrets:", error);
            return undefined;
        }
    }

    async get(id) {
        if (!this.client || !id) {
            console.error("Client or secret ID is missing.");
            return undefined;
        }
        try {
            return await this.client.secrets().get(id);
        } catch (error) {
            console.error("Failed to get secret:", error);
            return undefined;
        }
    }

    async getValue(id) {
        const secret = await this.get(id);
        if (!secret) {
            return undefined;
        }
        return secret.data?.value; // Optional chaining in JavaScript
    }
}