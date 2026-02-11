const router = require('express').Router();
const ctrl = require('../controllers/artifact.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/", authMiddleware, ctrl.createArtifact);
router.get("/", authMiddleware,ctrl.getArtifacts);

module.exports = router;

