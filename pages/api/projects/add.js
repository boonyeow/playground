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
                description: req.body.description,
                details: req.body.details,
                thumbnailSrc: req.body.thumbnailSrc,
                fundingGoal: req.body.fundingGoal,
                pricePerNFT: req.body.pricePerNFT,
                startTimestamp: req.body.startTimestamp,
                endTimestamp: req.body.endTimestamp,
                createdAt: Date.now(),
                varConst: 1,
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
