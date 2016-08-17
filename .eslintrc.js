module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "greasemonkey": true
    },
    "globals": {
        "FSH": true,
        "localforage": false,
        "ga": false,
        "GameData": false
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab",
            {"outerIIFEBody": 0}
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-constant-condition": [
            "error",
            {"checkLoops": false}
        ],
        "no-console": [
            // "warn"
            0
        ],
        "no-extra-parens": [
            "error"
        ],
        "array-callback-return": [
            "error"
        ],
        "block-scoped-var": [
            "error"
        ],
        // "complexity": [
            // "warn"
        // ],
        "curly": [
            "error"
        ],
        "dot-location": [
            "error",
            "property"
        ],
        "eqeqeq": [
            "error"
        ],
        "guard-for-in": [
            "error"
        ],
        // "no-alert": [
            // "warn"
        // ],
        "no-caller": [
            "error"
        ],
        "no-else-return": [
            "error"
        ],
        "no-empty-function": [
            "error"
        ],
        "no-eval": [
            "error"
        ],
        "no-extend-native": [
            "error"
        ],
        "no-extra-bind": [
            "error"
        ],
        "no-extra-label": [
            "error"
        ],
        "no-floating-decimal": [
            "error"
        ],
        "no-global-assign": [
            "error"
        ],
        // "no-implicit-coercion": [
            // "error"
        // ],
        "no-implicit-globals": [
            "error"
        ],
        "no-implied-eval": [
            "error"
        ],
        "no-lone-blocks": [
            "error"
        ],
        "no-loop-func": [
            "error"
        ],
        "no-multi-spaces": [
            "error"
        ],
        "no-new-func": [
            "error"
        ],
        "no-new-wrappers": [
            "error"
        ],
        "no-new": [
            "error"
        ],
    }
};