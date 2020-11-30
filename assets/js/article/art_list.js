$(function () {
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 1定义提交参数
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章状态
    }
    initTable()
    // 封装函数
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
                //分页
                renderPage(res.total)
            }
        })
    }
    //  4 初始化分类
    var form = layui.form;
    initCate()
    // 封装函数
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 5 实现筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.cate_id = cate_id
        q.state = state
        // 初始化文章列表
        initTable()
    })
    // 6 渲染分页
    var laypage = layui.laypage

    function renderPage(total) {
        laypage.render({
            elem: 'page-Box', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4],
            // 触发jump 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            jump: function (obj, first) {
                //obj 所在参数对象；first : 不执行第一次初始化页面
                // console.log(obj.curr);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    //do something
                    initTable()
                }
            }
        });
    }

    // 7删除
    $('tbody').on('click', '.btn-delet', function () {
        // 获取到文章ID
        var Id = $(this).attr('data-id')
        layer.confirm('是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                succsee: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    // 当数据删除完成后需要判断这一页是否有数据，如果没有数据页码就减一再渲染
                    if ($('.btn-delet').length == 1 && q.pagenum > 1) q.pagenum--,
                        initTable()
                }
            })
            layer.close(index);
        });
    })
})