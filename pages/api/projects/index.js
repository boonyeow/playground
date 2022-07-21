import db from "../../../db";

const handler = (req, res) => {
    if (req.method == "GET") {
        const params = {
            TableName: "projectdb",
            Key: { userAddress: req.query.userAddress },
            KeyConditionExpression: "userAddress = :userAddressValue",
            ExpressionAttributeValues: {
                ":userAddressValue": req.query.userAddress,
            },
        };
        db.query(params, (err, data) => {
            if (err)
                res.send(err); //remember to change it to res.send(statusCode);
            else res.status(200).json(data.Items);
        });
    } else {
        res.status(400).send("Request not allowed");
    }
};

export default handler;
