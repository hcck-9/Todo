$(function() {
    // alert(11);
    load();
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入内容");
            } else {
                // 1 获取本地数据
                var local = getData();
                // console.log(local);
                // 2 存储进本地数据
                local.push({ title: $(this).val(), done: false });
                $(this).val("");
                setData(local);
                load();
            }
        }
    });
    // 删除操作
    $(".doing,.done").on("click", "a", function() {
        // 获取数据
        var data = getData();
        var index = $(this).attr("id");
        // console.log(index);
        // 删除操作
        data.splice(index, 1);
        // 重新存储
        setData(data);
        // 渲染到页面
        load();
    });
    // 选择已经完成还是正在进行
    $(".doing,.done").on("click", "input", function() {
        // 获取数据
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        // console.log(index);
        // 修改操作
        data[index].done = $(this).prop("checked");
        // 重新存储
        setData(data);
        // 渲染到页面
        load();
    });
    // 获取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 存储进本地数据
    function setData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 加载数据
    function load() {
        var data = getData();
        // 在加载之前要清空 ul 的内容
        $(".doing,.done").empty();
        var todoCount = 0; // 正在进行
        var doneCount = 0; // 已经完成
        $.each(data, function(i, ele) {
            if (ele.done) {
                doneCount++;
                $(".done").prepend($("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p> <a id=" + i + " href='javascript:;'>-</a></li>"));
            } else {
                todoCount++;
                $(".doing").prepend($("<li><input type='checkbox'><p>" + ele.title + "</p> <a id=" + i + " href='javascript:;'>-</a></li>"));
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
    $("footer a").on("click", function() {
        // 清空 ul ol 里面的li
        var data = getData();
        data = [];
        setData(data);
        load();
        // $(".doing,.done").empty();
    });
});