$(function(){
    // 1 自定义验证规则
    var form = layui.form
    form.verify({
        nickname:function(value){
            if (value.length > 6){
                return '昵称1 ~ 6 位'
            }
        }
    })
    // 2 用户渲染
    initUserInfo()
    var layer = layui.layer
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if (res.status !== 0){
                   return layer.msg(res.message)
                }
                // 成功后渲染
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 3 表单重置
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    // 4修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layer.msg (res.message)
                }
                layer.msg('修改成功')
                window.parent.getUserInof()
            }
        })
    })
})