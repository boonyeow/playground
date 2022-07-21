import s3 from "../../s3";

function Download(bucket, key, callback) {
    var params = {
        Key: key,
        Bucket: bucket,
    };
    try {
        s3.getObject(params, function (error, data) {
            if (error) {
                console.log("Error while reading file " + key + ":" + bucket);
                return callback("Error!");
            } else {
                console.log("Returning contents from " + key + ":" + bucket);
                return callback(Buffer.from(data.Body, "utf8").toString());
            }
        });
    } catch (error) {
        console.error(error);
        return callback("Error!");
    }
}

const url = () => {
    const temp = s3.getSignedUrl("getObject", {
        Bucket: "sauce",
        Key: "contracts-0.0.1-optimized.jar",
        Expires: 100,
    });
    return temp;
};

export default function handler(req, res) {
    Download("sauce", "contracts-0.0.1-optimized.jar");
    res.status(200).json({
        hello: "hello",
    });
}
