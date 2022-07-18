import db from "../../db";

const getParams = (query) => {
    const params = {
        TableName: "users",
        Key: {
            userAddress: query.userAddress,
        },
    };
    return params;
};

const postParams = (body) => {
    const params = {
        TableName: "users",
        Item: {
            userAddress: body.userAddress,
            nonce: Math.floor(Math.random() * 1000000),
        },
    };
    return params;
};

export default async function handler(req, res) {
    if (req.method === "GET") {
        const params = getParams(req.query);
        db.get(params, function (err, data) {
            if (err) res.send(err);
            else res.send(JSON.stringify(data.Item));
        });
    } else if (req.method == "POST") {
        const params = postParams(req.body);
        db.put(params, function (err, data) {
            if (err) res.send(err.statusCode);
            else res.send(JSON.stringify(params.Item));
        });
    } else {
        res.status(400).send("Only POST/GET requests are allowed");
    }
}
