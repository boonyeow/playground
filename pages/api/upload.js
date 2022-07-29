export default async function handler(req, res) {
    res.status(200).send({ hh: "Only POST/GET requests are allowed" });
}
