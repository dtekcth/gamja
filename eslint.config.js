import globals from "globals";
import js from "@eslint/js";

export default [
	js.configs.recommended,
	{
		ignores: ["dist/"],
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
		},
	},
];
