/**Created by xiaoqi on 2019/3/16*/
module.exports = {
    baseUrl:'/',//部署应用的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir:'dist',//运行时生成的生产环境构建文件的目录(默认'dist',构建之前会被清除)
    assetsDir:'public',//防止生成静态资源(s,css,img,font)的(相对于outputDir的)目录(默认"")
    indexPath:'index.html',//指定生成的index.html的输出路径(相对于outputDir)也可以时一个绝对路径.
    pages:{
        //pages里配置的路径和文件名在你的文档目录必须存在,否则启动服务会报错
        index:{
            //除了entry之外都是可选的
            entry:'src/main.js',
            template:'public/index.html',//模板来源
            filename:'index.html',//在dist/index.html的输出
            title:'Index Page',//当使用title选项时,在template中使用:<title><%= htmlWebpackPlugin.options.title %></title>
            chunks:['chunk-vendors','chunk-common','index']//在这个页面中包含的块,默认情况下会包含,提取出来的通用chunk和vendorchunk
        }
    },
    lintOnSave:true,//是否在保存的时候检查
    productionSourceMap:true,//生产环境是否生产sourceMap文件
    css:{
        extract:true,//是否使用css分离插件 ExtractTextPlugin
        sourceMap:false,//开启css source maps
        loaderOptions:{},//css预设器配置项
        modules:false//启用css modules for all css / pre-processor files.
    },
    //反向代理
    // devServer: {
    //   // 环境配置
    //   host: '192.168.1.53',
    //   port: 8080,
    //   https: false,
    //   hotOnly: false,
    //   open: true, //配置自动启动浏览器
    //   proxy: {
    //     // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
    //     // '/api': {
    //     //   target: 'http://192.168.1.248:9888',
    //     //   // target: 'http://192.168.1.4:8999',
    //     //   pathRewrite: {
    //     //     '^/api': '/api'
    //     //   }
    //     // }
    //   }
    // },
    pluginOptions:{
        //第三方插件配置
    }
};