const router = require("express").Router();
const {
  generateShortId,
  redirectToOriginalUrl,
} = require("../controllers/UrlController");

const { authenticateUser } = require("../middleware/authenticate");

router.post("/shorten", authenticateUser, generateShortId);
router.get("/:shortId", redirectToOriginalUrl);

module.exports = router;
