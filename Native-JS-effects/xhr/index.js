var xhr = new  XMLHttpRequest();

xhr.open('get',index.php,false);//默认第三个参数为false, 表示异步
xhr.setRequestHeader('Content-type','text/html');//get 请求可以不设置
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
xhr.send(null);

xhr.onreadystatechage = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        var result = documnent.querySelector('.result');
        xhr.getResponseHeader('Content-Type'); //获取指定的响应头信息
        xhr.getAllResponseHeader(); // 获取所有的响应头信息
        result.innerHTML = xhr.responseText;
    }
}