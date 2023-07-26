module.exports = {
	entry: './js/client.js',
    devServer: {
        port: 8080,
        proxy: {
            '/statusHub': {
                target: 'http://localhost:5132',
                ws: true
            }
        }
    }
};
