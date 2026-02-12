const router = require("express").Router();
const ctrl = require("../controllers/artifact.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, ctrl.createArtifact);
router.get("/", authMiddleware, ctrl.getArtifacts);

// LIKE
router.post("/:id/likes", authMiddleware, ctrl.toggleLike);
router.get("/:id/likes", authMiddleware, ctrl.getLikes);

// COMMENT
router.post("/:id/comments", authMiddleware, ctrl.addComments);
router.get("/:id/comments", authMiddleware, ctrl.getComments);

module.exports = router;
