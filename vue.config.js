const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // target: 'https://mastermindgeeks.herokuapp.com'
      },
    },
  },
};
