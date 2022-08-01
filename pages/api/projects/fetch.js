import db from "../../../db";
const handler = (req, res) => {
    if (req.method == "GET") {
        const params = {
            TableName: "projectdb",
            IndexName: "createdAt-contractAddress-index",
            KeyConditionExpression: "varConst = :id",
            ExpressionAttributeValues: {
                ":id": 1,
            },
        };
        db.query(params, (err, data) => {
            if (err)
                res.send(err); //remember to change it to res.send(statusCode);
            else res.status(200).json(data.Items);
        });
    }
};

export default handler;
