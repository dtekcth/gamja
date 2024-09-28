import globals from "globals";
import js from "@eslint/js";

export default [
	{
		ignores: ["dist/"],
	},
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				"process": "readonly",
			},
		},
		rules: {
			"no-case-declarations": "off",
			"no-unused-vars": ["error", {
				args: "none",
				caughtErrorsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
			}],
			"no-var": "error",
		},
	},
];
