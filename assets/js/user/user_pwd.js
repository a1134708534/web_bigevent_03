$(function(){
    // 1 自定义校验规则
    var form = layui.form
    form.verify({
        // 1.1 密码
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        // 1.2 新旧不重复
        newPwd:function(value){
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        // 1.3 两次密码需要一致
        rePwd:function(value){
            if (value !== $('[name=newPwd]').val()){
                return '两次输入结果需一致'
            }
        }
    })
    // 2 提交表单
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})