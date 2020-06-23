const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: "./index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "public"),
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				include: [path.resolve(__dirname, "components")],
				loader: 'vue-loader',
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	devServer: {
		contentBase: "public",
	},
};
