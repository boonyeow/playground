import AWS from "aws-sdk";

// Update AWS config
AWS.config.update({
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    region: "us-east-1",
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

export default db;
