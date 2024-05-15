module.exports = (env) => {
    return {
        test: /\.js$/,
        exclude: [
            '/node_modules/'
            //'/app/scripts/vendor/',
        ],
        use: [
            {
                loader: 'babel-loader'
            }
        ]
    };
};
