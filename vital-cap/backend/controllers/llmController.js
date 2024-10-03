
const llmService = require("../services/llmService");
exports.extractText = async (req,res) => {
    const fileName = req.body.name;
    if (!fileName) {
        return res.status(400).send("Image name is required");
    }
    const response = await llmService.extractText(fileName);
    res.status(200).json(response);
};