module.exports = {
    "env": {
        "node": true,
		"amd": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "rules": {
        "indent": "off",
        "linebreak-style": 0,
		'no-console': 'off',
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};