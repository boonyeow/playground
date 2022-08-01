import db from "../../../db";

//projectdb table
//userAddress, contractAddress, createdAt, description, details, endTimestamp, fundingGoal, name, pricePerNFT, startTimestamp, thumbnailSrc, varConst
//1659078315056

const handler = (req, res) => {
    if (req.method == "GET") {
        if (req.query.lastEvaluatedKey == []) {
            const params = {
                "TableName": "projectdb",
                "IndexName": "createdAt-contractAddress-index",
                "KeyConditionExpression": 'varConst = :id',
                "ExpressionAttributeValues": { ':id': 1},
                "ScanIndexForward": false,
                "Limit":9
            }
            db.query(params, (err, data) => {
                if (err)
                    res.send(err); //remember to change it to res.send(statusCode);
                else res.status(200).json({...data.Items, "lastEvaluatedKey":data.LastEvaluatedKey});
            });
        } else {
            const params = {
                "TableName": "projectdb",
                "IndexName": "createdAt-contractAddress-index",
                "KeyConditionExpression": 'varConst = :id',
                "ExpressionAttributeValues": { ':id': 1},
                "ExclusiveStartKey": {
                    "contractAddress":"cx67deb13f90599e44068b1478edf9ab824f785e07",
                    "createdAt":1659078315056,
                    "userAddress":"hx137ceb2e58e5008a4a7c282609e508251dab74cm",
                    "varConst":1,
                },
                "ScanIndexForward": false,
                "Limit":9
            }
            db.query(params, (err, data) => {
                if (err)
                    res.send(err); //remember to change it to res.send(statusCode);
                else res.status(200).json({...data.Items, "lastEvaluatedKey":data.LastEvaluatedKey});
            });
        }
    }
    else {
        res.status(400).send("Request not allowed");
    }
};

export default handler;