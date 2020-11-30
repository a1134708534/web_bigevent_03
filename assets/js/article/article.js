$(function () {
    var form = layui.form
    var layer = layui.layer
    // 1 获取文章
    initArtCateList()
    // 封装函数
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var str = template('art_list', res)
                // console.log(str);
                $('tbody').html(str)
            }
        })
    }
    // 显示添加文章分类列表
    $('#btnAdd').on('click', function () {
        // 利用框架代码
        indexAdd = layer.open({
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '260px'],
            type: 1
        });
    })
    // 提交文章分类
    // 3提交文章分类添加(事件委托)
    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        // console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜添加成功')
                layer.close(indexAdd)
            }
        })
    })
    //  文章修改 展示表单
    var indexEdit = null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
            area: ['500px', '260px'],
            type: 1
        });
        // 获取ID，发送ajax获取数据，渲染页面
        var Id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + Id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
    })
    //  修改提交
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜添加成功')
                layer.close(indexEdit)
            }
        })
    })
    //删除按钮
    $('tbody').on('click','.btn-delete',function(){
        var Id = $(this).attr('data-id')
        // 显示对话框
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + Id,
                success:function(res){
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('恭喜删除成功')
                }
            })
            layer.close(index);
          });
    })
})