import s3 from "../../s3";
import formidable from "formidable";
import fs from "fs";
import AWS from "aws-sdk";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const current = new Date();
    const form = new formidable.IncomingForm();
    form.parse(req);
    form.on("file", (formname, file) => {
        const MB = 1048576; // 1MB to bytes in binary
        if (file.size > MB) {
            res.status(200).send({ error: "Maximum file upload size is 1MB" });
        }

        if (!file.mimetype.startsWith("image")) {
            res.status(200).send({ error: "Only images can be uploaded" });
        }

        let params = {
            Bucket: "sauce",
            Key: `${current.getTime()}_${file.newFilename}.png`, // trying to rename
            Body: fs.readFileSync(file.filepath),
        };

        s3.putObject(params, function (error, data) {
            if (error) {
                console.error(error);
                res.status(400).send({ error: error });
            } else {
                console.log("Successfully uploaded file");
                console.log("data", data);
                res.status(200).send({
                    default: `https://sauce.s3.filebase.com/${params.Key}`,
                });
            }
        });
    });
}
