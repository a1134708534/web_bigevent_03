// 1 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 2拦截ajax请求
$.ajaxPrefilter(function(params){
    params.url = baseURL + params.url
    // 对需要权限的接口配置信息
    if(params.url.indexOf('/my/') !== -1){
        params.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    params.complete = function(res){
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！'){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
