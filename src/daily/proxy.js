/**Created by xiaoqi on 2019/3/18*/
const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;
const imgPort = 8011;

//创建一个API代理服务
const apiServer = http.createServer((req,res)=>{
    const url = 'https://news-at.zhihu.com/api/4' + req.url;
    //是一个类是关联数组的对象,标识请求的参数,callback作为回调函数
    /**
     * optinos的参数有 host ,port(默认为80),method(默认给get),path(请求的相对于跟路径,默认是'/')
     * */
    const options = {
        url:url
    };
    function callback(error,response,body){
        if(!error && response.statusCode === 200){
            //设置编码类型,否则中文会显示为乱码
            res.setHeader('Content-Type','text/plain;charset=UTF-8');
            //设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin','*');
            //返回代理后的内容
            res.end(body);
        }
    }
    request.get(options,callback)
});

//监听8010端口
apiServer.listen(port,hostname,()=>{
    console.log(`代理接口运行在http://${hostname}:${port}/`);
});

//创建一个图片代理服务
const imgServer = http.createServer((req,res)=>{
    const url = req.url.split('/img/')[1];
    const options = {
        url:url,
        encoding:null
    };
    function callback(error,response,body){
        if(!error && response.statusCode ===200){
            const contentType = response.headers['content-type'];
            //设置编码类型,否则中文会显示为乱码
            res.setHeader('Content-Type',contentType);
            //设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin','*');
            res.end(body);
        }
    }
    request.get(options,callback)
});
//监听8011端口
imgServer.listen(imgPort,hostname,()=>{
    console.log(`代理接口运行在http://${hostname}:${imgPort}/`);
});