$(function () {
    // 1点击去注册账号，影藏登录区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 1点击去登录，影藏注册区域，显示登录区域
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})
    //自定义验证规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // 选择器必须带空格 选中的是后代 input name 属性
            var pwd = $('.reg-box [name=password]').val()
            // 比较
            if (value !== pwd) {
                return '两次输入密码不一致'
            }
        }
    })
    // 4 注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                // 返回判断状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功后提交
                return layer.msg(res.message)
            }
        })
    })
    // 5登录功能
    $('#form_login').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layer.msg('res.message')
                }
                // 提示信息 保存token 跳转页面
                layer.msg('登陆成功')
                // 保存
                localStorage.setItem('token',res.token)
                // 跳转
                location.href = '/index.html'
            }
        })
    })
