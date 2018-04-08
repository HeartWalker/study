
/**
 * 冒泡排序 升序
 * 比较相邻两个元素的大小,如果前一个比后一个大则交换位置
 * 进行
 * @param {Array} arr 数组
 * @return {Array}
 */
function sort(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++ ){
        for(var j = 0; j < len - i - 1; j++){
            if(arr[j] > arr[j+1]){
                var swap = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = swap;
            }
        }
    }
}

var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8];
console.log('before: ' + elements);
sort(elements);
console.log(' after: ' + elements);

/**
 *快速排序 升序
 * 取一个中间参考值,将数据分为两部分,一部分比所有的数据都要小,另一部分比所有的都要大,然后递归
 * @param {Array} arr
 * @return {Array}
 */
function quickSort(arr) {
    if(arr.length <= 1) {return arr;}
    var povitIndex = Math.floor( arr.length / 2);
    var povit = arr.splice( povitIndex, 1)[0];
    var left = [], right = [];

    for(var i = 0; i < arr.length; i++ ){
        if( arr[i] < povit ){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([povit], quickSort(right));
}

var elements=[5,6,2,1,3,8,7,1.2,5.5,4.5];
alert(quickSort(elements));


/**
 * 插入排序 升序
 *  （1） 从第一个元素开始，该元素可以认为已经被排序
 * （2） 取出下一个元素，在已经排序的元素序列中从后向前扫描
 * （3） 如果该元素（已排序）大于新元素，将该元素移到下一位置
 * （4） 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 * （5）将新元素插入到下一位置中
 * （6） 重复步骤2
 *  从以arr[i]为参考变量temp,逐次对比交换,arr[i]左右被分为有序与无序,在arr[j] <= temp的位置停止并将temp的值赋给此时的位置
 * @param {Array} arr
 * @return {Array}
 */
function insertSort(arr) {
    for( var i = 1; i < arr.length; i++){
        var temp = arr[i];
        var  j = i - 1;
        while( j >= 0 && arr[j] > temp){
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }

    return arr;
}

var elements=[5,6,2,1,3,8,7,1.2,5.5,4.5];
alert(insertSort(elements));