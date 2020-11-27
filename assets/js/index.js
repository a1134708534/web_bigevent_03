// 入口函数
$(function () {
    // 1 获取信息
    getUserInof()
    // 2退出按键
    $('#btnLogout').on('click', function () {
        layer.confirm('真的要走吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1清空本地token
            localStorage.removeItem('token')
            // 2跳转到登录界面
            location.href = '/login.html'
            layer.close(index);
        });
    }) 
})
// 获取信息 写到外面
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        /* headers:{
            Authorization:localStorage.getItem('token') || ''
        }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像函数
function renderAvatar(user) {
    // 用户名 (昵称优先)
    var name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)
    // 2用户头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.user-avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text)
    }
}