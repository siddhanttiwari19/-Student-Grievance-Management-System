const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/grievanceController");

router.post("/", auth, ctrl.create);
router.get("/", ctrl.getAll);
router.get("/search", ctrl.search);
router.get("/:id", ctrl.getById);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;