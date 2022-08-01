const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  import: "#root",
  theme: {
    extend: {},
  },
  plugins: [],
});