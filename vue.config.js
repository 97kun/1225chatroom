module.exports={
    baseUrl:"./",
    devServer: {
        // port: 8080,
        proxy: {
            '/zk': {
                target: 'http://47.98.47.228:8080/',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/zk': ''  // rewrite path
                }
            },
        }
    }
}