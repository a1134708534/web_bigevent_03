$(function(){
    // 1点击去注册账号，影藏登录区域，显示注册区域
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 1点击去登录，影藏注册区域，显示登录区域
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
})