const shortId = require("shortid");

class urlShort {
  constructor() {
    this.urlMap = {};
  }

  createUrl(long_url, custom_alias, ttl_seconds) {
    let alias = custom_alias ? custom_alias : shortId.generateShortUrl();
    const ttl = ttl_seconds ? ttl_seconds * 1000 : 120 * 1000;

    while (this.urlMap[alias]) {
      alias = shortId.generateShortUrl();
    }

    this.urlMap[alias] = {
      long_url,
      created_at: Date.now(),
      ttl,
      access_count: 0,
      access_times: [],
    };

    return alias;
  }

  getUrlData(alias) {
    return this.urlMap[alias];
  }

  deleteUrl(alias) {
    delete this.urlMap[alias];
  }

  uppdateUrl(alias, ttl_seconds, newAlias) {
    const reqUrl = this.urlMap[alias];

    if (newAlias) {
      if (this.urlMap[newAlias]) {
        return false;
      }

      this.urlMap = [...reqUrl];
      delete this.urlMap[alias];
    }

    if (ttl_seconds) {
      reqUrl.ttl = ttl_seconds * 1000;
    }

    return true;
  }
}

const url_Short = new urlShort();

module.exports = url_Short;
