const express = require("express");
const router = express.Router();
const urlController = require("../controller/urlController");

router.post("/shorten", urlController.shortUrl);

router.get("/:alias", urlController.redirectUrl);

router.get("/analytics/:alias", urlController.getUrlAnalyts);

router.put("/update/:alias", urlController.urlUpdate);

router.delete("/:alias", urlController.deleteUrl);

module.exports = router;
