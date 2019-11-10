module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: 
          `
          @import "@/Styles/Base/__base.scss";
          @import "@/Styles/Utilities/__utilities.scss";
          @import "@/Styles/Components/__components.scss";
          `
        }
      }
    }
  };