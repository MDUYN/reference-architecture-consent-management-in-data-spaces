const withImages = require('next-images')
module.exports = withImages({
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader'
            }
        )
        return config
    },
});