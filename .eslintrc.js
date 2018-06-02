module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb",'plugin:react/recommended'],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
};
