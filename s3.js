import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.FILEBASE_KEY,
    secretAccessKey: process.env.FILEBASE_SECRET,
});

// Create S3 object
const s3 = new AWS.S3({
    endpoint: "https://s3.filebase.com",
    signatureVersion: "v4",
});

export default s3;
