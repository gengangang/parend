$(function () {
    load();
    $('#title').on('keyup', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() == '') {
                return false;
            }

            //读取本地数据

            var local = getDate();
            //追加给本地数据
            local.push({ title: $(this).val(), done: false });
            //保存到本地数据里
            saveDate(local);

            load();

            $(this).val('');
        }
    });

    $('ol,ul').on('click', 'a', function () {
        var data = getDate();

        var index = $(this).prop('id')
        data.splice(index, 1);
        saveDate(data);
        load();
    })

    $('ol,ul').on('click', 'input', function () {
        var data = getDate();
        var index = $(this).siblings('a').prop('id');

        data[index].done = $(this).prop('checked');

        saveDate(data);
        load();
    })


    //获取数据
    function getDate() {
        //获取内存中的数据
        var data = localStorage.getItem('todolist');
        //判断数据 如果获取的数据是返回[]
        if (data == null) {
            return [];
        } else {
            //如果获取到数据 用JSON.parse()把本地存储的字符串格式，改成对象格式
            return JSON.parse(data);
        }
    };
    //存储数据
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data))
    }

    //渲染页面
    function load() {
        var data = getDate();

        $('ol,ul').empty();
        $.each(data, function (i, el) {
            if (el.done == true) {
                $('ul').prepend(`<li >
                <input type="checkbox" checked>
                <p>${el.title}</p>
                <a href="javascript:;" id=${i}></a>
            </li>`)
            } else {
                $('ol').prepend(`<li >
                <input type="checkbox" name="" id="">
                <p>${el.title}</p>
                <a href="javascript:;" id=${i}></a>
            </li>`)
            }

        });
        $('#todocount').text($('ol li').length);
        $('#donecount').text($('ul li').length);
    }
})