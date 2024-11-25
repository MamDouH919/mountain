const { config } = require("./config");

const i18nConfig = {
    locales: config.app.languages,
    defaultLocale: 'en'
};

module.exports = i18nConfig;