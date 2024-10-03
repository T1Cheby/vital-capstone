exports.errorHandling = (err, req, res, next) => {
    console.err("Error while handling middleware" + err);
    res.status(500).send("Error while processong your process");
}
