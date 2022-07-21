import { redirect } from "next/dist/server/api-utils";
import db from "../../../db";

const handler = (req, res) => {
    if (req.method == "POST") {
        const params = {
            TableName: "projectdb",
            Item: {
                userAddress: req.body.userAddress,
                contractAddress: req.body.contractAddress,
                name: req.body.name,
                shortDescription: req.body.shortDescription,
                longDescription: req.body.longDescription,
                thumbnail: req.body.thumbnail,
                fundingGoal: req.body.fundingGoal,
                softCap: req.body.softCap,
            },
        };
        db.put(params, (err, data) => {
            if (err)
                res.send(err); //remember to change it to res.send(statusCode);
            else res.status(200).json(data);
        });
    } else {
        res.status(400).send("Request not allowed");
    }
};

export default handler;
