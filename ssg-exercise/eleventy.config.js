export default async function(eleventyConfig) {
	// Configure Eleventy
	eleventyConfig.addPassthroughCopy("src/media");
  	eleventyConfig.addPassthroughCopy("src/style.css");
	eleventyConfig.addPassthroughCopy("src/theme.js");

	return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
