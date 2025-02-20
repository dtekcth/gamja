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
			"no-eval": "error",
			"no-implied-eval": "error",
			"eqeqeq": "error",
			"no-invalid-this": "error",
			"no-extend-native": "error",
			"prefer-arrow-callback": "error",
			"no-implicit-globals": "error",
			"no-throw-literal": "error",
			"no-implicit-coercion": "warn",
			"object-shorthand": "warn",
			"curly": "warn",
			"camelcase": "warn",
			"@stylistic/js/indent": ["warn", "tab"],
			"@stylistic/js/quotes": ["warn", "double"],
			"@stylistic/js/semi": "warn",
			"@stylistic/js/brace-style": ["warn", "1tbs"],
			"@stylistic/js/comma-dangle": ["warn", "always-multiline"],
			"@stylistic/js/arrow-parens": "warn",
			"@stylistic/js/object-curly-spacing": ["warn", "always"],
			"@stylistic/js/object-curly-newline": ["warn", {
				multiline: true,
				consistent: true,
			}],
			"@stylistic/js/array-bracket-spacing": ["warn", "never"],
			"@stylistic/js/array-bracket-newline": ["warn", "consistent"],
		},
	},
];
