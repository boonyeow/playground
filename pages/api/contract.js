import s3 from "../../s3";

// adapted from https://github.com/OpenDevICON/token-score-factory/blob/6f3d17d52654f9f755ce58b3659cec32935fd48d/Frontend/src/Helpers/fetchContractContent.js
function padLeadingZeros(num, size) {
    var s = num;
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

const fetchContractContent = async () => {
    try {
        let params = {
            Bucket: "sauce3",
            Key: "contracts-0.0.1-optimized.jar",
        };

        const data = await s3.getObject(params).promise();
        let byteArray = Buffer.from(data.Body, "utf8");
        let contentInHex = "";
        for (var i = 0; i < byteArray.length; ++i) {
            const byteInHex = padLeadingZeros(byteArray[i].toString("16"), 2);
            contentInHex = contentInHex + byteInHex;
        }
        let contractContent = "0x" + contentInHex;
        return contractContent;
    } catch (err) {
        throw new Error(`Could not retrieve file from S3: ${err.message}`);
    }
};

export default async function handler(req, res) {
    // note: remember to handle nicely
    if (req.method == "GET") {
        res.status(200).json({
            data: await fetchContractContent(),
        });
    } else {
        res.status(400).send("Only GET requests are allowed");
    }
}
