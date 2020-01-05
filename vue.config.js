module.exports = {
    devServer: {
        proxy: 'http://localhost:8080',
        open:true,
        overlay: {
            warnings: false,
            errors: false
        }
    },
    lintOnSave:false
}
