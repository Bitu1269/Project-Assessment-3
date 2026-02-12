// const Artifact = require("../models/artifact.model");

// exports.createArtifact = async (req, res) => {
//     const artifact = await Artifact.create({
//         ...req.body,
//         createdBy: req.user._id,
//     });
//     res.json(artifact);
// };
// exports.getArtifacts = async (req, res) => {
//     const artifact = (await Artifact.find()).populate("createdBy", "email");
//     res.json(artifact);
// };   



const Artifact = require("../models/artifact.model");

// CREATE ARTIFACT
exports.createArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.create({
            ...req.body,
            createdBy: req.user._id,
        });
        res.json(artifact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL ARTIFACTS
exports.getArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find()
            .populate("createdBy", "email");
        res.json(artifacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// TOGGLE LIKE
exports.toggleLike = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (!artifact)
            return res.status(404).json({ message: "Artifact not found" });

        const userId = req.user._id;

        if (artifact.likes.includes(userId)) {
            artifact.likes.pull(userId);
        } else {
            artifact.likes.push(userId);
        }

        await artifact.save();

        res.json({
            message: "Like updated",
            totalLikes: artifact.likes.length
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET LIKES
exports.getLikes = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (!artifact)
            return res.status(404).json({ message: "Artifact not found" });

        res.json({ totalLikes: artifact.likes.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD COMMENT
exports.addComments = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (!artifact)
            return res.status(404).json({ message: "Artifact not found" });

        artifact.comments.push({
            userId: req.user._id,
            text: req.body.text
        });

        await artifact.save();

        res.json({ message: "Comment added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET COMMENTS
exports.getComments = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id)
            .populate("comments.userId", "email");

        if (!artifact)
            return res.status(404).json({ message: "Artifact not found" });

        res.json(artifact.comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
