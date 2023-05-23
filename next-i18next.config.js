const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ro"],
    localePath: path.resolve("./public/locales"),
  },
};
