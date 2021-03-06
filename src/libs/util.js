/**Created by xiaoqi on 2019/3/18*/
import axios from 'axios';
//基本配置
const Util = {
    imgPath: 'http://127.0.0.1:8011/img/',
    apiPath: 'http://127.0.0.1:8010/'
};

//获取今天时间戳
Util.getTodayTime = function () {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};
//获取上一天日期
Util.prevDay = function (timestamp=(new Date()).getTime()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth()+1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()+1 ;
    const day = date.getDay() < 10 ? '0'+date.getDay():date.getDay();
    return year+''+month+''+day;
};

//Ajax通用配置
Util.ajax = axios.create({
    baseURL: Util.apiPath
});

//添加一个请求拦截
// Util.ajax.interceptors.request.use((config)=>{
//     return config
// },(error)=>{
//     return Promise.reject(error);
// });

//添加响应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
});
export default Util;