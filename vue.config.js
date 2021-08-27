module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/common/assets/styles/globals.scss";`,
      },
    },
  },
};
