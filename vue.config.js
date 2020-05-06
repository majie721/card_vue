module.exports = {
  devServer: {
    proxy: "http://localhost:8081",
    open: true,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
};
