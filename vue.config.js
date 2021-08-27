module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/common/assets/styles/globals.scss";`,
      },
    },
  },
};
