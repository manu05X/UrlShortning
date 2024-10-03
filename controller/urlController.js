const urlModel = require("../model/urlShort");

const urlController = {
  shortUrl: (req, res) => {
    const { long_url, custom_alias, ttl_seconds } = req.body;

    if (!long_url) {
      return res.status(400).json({ error: "long_url is required" });
    }

    const alias = urlModel.createUrl(long_url, custom_alias, ttl_seconds);

    res.json({ shortUrl: `http://localhost:3000/${alias}` });
  },

  redirectUrl: (req, res) => {
    const alias = req.params.alias;
    const urlData = urlModel.getUrlData(alias);

    if (urlData) {
      urlData.access_count += 1;
      urlData.access_times.push(new Date().toISOString());

      res.redirect(urlData.long_url);
    } else {
      res.status(404).json({ error: "Alias does not exist" });
    }
  },

  getUrlAnalyts: (req, res) => {
    const alias = req.params.alias;
    const urlData = urlModel.getUrlData(alias);

    if (urlData) {
      res.json({
        alias,
        long_url: urlData.long_url,
        access_count: urlData.access_count,
        access_times: urlData.access_times.slice(-10),
      });
    } else {
      res.status(404).json({ error: "Alias does not exist" });
    }
  },

  deleteUrl: (req, res) => {
    const alias = req.params.alias;

    if (urlModel.getUrlData(alias)) {
      urlModel.deleteUrl(alias);

      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ error: "Alias does not exist" });
    }
  },

  urlUpdate: (req, res) => {
    const alias = req.params.alias;
    const { custom_alias, ttl_seconds } = req.body;

    if (!urlModel.getUrlData(alias)) {
      return res.status(404).json({ error: "Alias does not exist" });
    }

    const data = urlModel.uppdateUrl(alias, ttl_seconds, custom_alias);

    if (data) {
      res.status(200).json({ message: "Succesfully updated" });
    } else {
      res.status(400).json({ error: "Alias does not Update" });
    }
  },
};

module.exports = urlController;
