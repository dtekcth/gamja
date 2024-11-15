import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

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
		plugins: { "@stylistic/js": stylisticJs },
		rules: {
			"no-case-declarations": "off",
			"no-unused-vars": ["error", {
				args: "none",
				caughtErrorsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
			}],
			"no-var": "error",
			"eqeqeq": "error",
			"no-invalid-this": "error",
			"prefer-arrow-callback": "error",
			"@stylistic/js/indent": ["warn", "tab"],
			"@stylistic/js/quotes": ["warn", "double"],
			"@stylistic/js/semi": "warn",
			"@stylistic/js/comma-dangle": ["warn", "always-multiline"],
			"@stylistic/js/arrow-parens": "warn",
		},
	},
];
