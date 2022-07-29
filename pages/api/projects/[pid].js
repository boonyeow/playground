import { redirect } from "next/dist/server/api-utils";
import db from "../../../db";

const handler = (req, res) => {
    const pid = req.query.pid;
    if (req.method == "GET") {
        // check if query is
        const params = {
            TableName: "projectdb",
            IndexName: "createdAt-contractAddress-index",
            KeyConditionExpression: "createdAt = :createdAt",
            ExpressionAttributeValues: {
                ":createdAt": 1658950688643,
            },
            // Key: {
            //     contractAddress: pid,
            // },
        };
        db.query(params, (err, data) => {
            if (err) res.status(400).send(err);
            else res.status(400).send(data);
        });
    } else {
        res.status(400).send("Not allowed");
    }
};

export default handler;
