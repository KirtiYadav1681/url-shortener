const Url = require("../models/Url");
const generateUniqueId = require("generate-unique-id");

module.exports.generateShortId = async (req, res) => {
  const user = req.user;
  const { url } = req.body;
  if (!url) return res.json({ error: "Url is required." });
  else {
    const urlAlreadyPresent = await Url.findOne({ originalUrl: url });
    if (urlAlreadyPresent) return res.json(urlAlreadyPresent);
    else {
      const shortId = generateUniqueId({
        length: 5,
      });
      const newEntry = await Url.create({
        user: user._id,
        originalUrl: url,
        shortUrl: shortId,
      });
      return res.json({
        orignalUrl: url,
        shortUrl: `http://localhost:8000/${shortId}`,
      });
    }
  }
};

module.exports.redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;
  const foundEntry = await Url.findOne({ shortUrl: shortId });

  if (!foundEntry) {
    return res.json({ error: "No entry found" });
  } else {
    const originalUrl =
      foundEntry.originalUrl.startsWith("http://") ||
      foundEntry.originalUrl.startsWith("https://")
        ? foundEntry.originalUrl
        : "http://" + foundEntry.originalUrl;
    res.redirect(originalUrl);
  }
};
