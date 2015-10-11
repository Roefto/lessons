
    /*-----------Массивы c числовыми индексами. Задания: Создайте калькулятор для введённых значений,
     Получить случайное значение из массива, Поиск в массиве, Фильтр диапазона, Решето Эратосфена,
     Подмассив наибольшей суммы-----------*/

    //Вкладка: Калькулятор, Случайное значение, Поиск в массиве, Фильтр диапазона.

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function randomArrNumber(){ //Задание: Получить случайное значение из массива.
        var min = 0,
            max = arrr.length - 1;
        var rand = min + Math.floor(Math.random() * (max + 1 - min));
        return "Случайный элемент массива: " + arrr[rand];
    }

    function findArrValue(value){ //Задание: Поиск в массиве.
        var positions = [];
        for(var i=0; i < arrr.length; i++){
            if(arrr[i] == value) positions.push(i);
        }
        return positions == "" ? "Совпадений нет"
                               : "Совпадения с элементами со следующими номерами: " + positions;
    }

    function arrFilterRange(start, end){ //Задание: Фильтр диапазона.
        var filterarr = [];
        for(var i=0; i < arrr.length; i++){
            if(arrr[i] >= start && arrr[i] <= end) filterarr.push(arrr[i]);
        }
        return filterarr == "" ? "Нет совпадений в рамках заданного диапазона"
                               : "Новый массив с учетом заданного диапазона: " + filterarr;
    }

    var arrr = [];
    function calculate(){ //Задание: Создайте калькулятор для введённых значений.
        var i = 0;
        var sum = 0;
        while(true){
            var value = prompt("Введите число", "");
            if(!isNumeric(value)) return sum;
            arrr.push(+value);
            sum += arrr[i];
            i++;
        }
    }
/* // Без использования массива
    function calculate(){
        var i = 0;
        var sum = 0;
        while(true){
            var value = prompt("Введите число", "");
            if(!isNumeric(value)) return sum;
            sum += +value;
            i++;
        }
    }
*/

    $("#lesson7-task1").on("click", function(){
        calculate();
        var start = $("#filterstart").val();
        var end = $("#filterend").val();
        var find = $("#findval").val();
        $(this).next().html(findArrValue(find))
               .next().html(randomArrNumber())
            .next().html(arrFilterRange(start, end));
    });




    //Вкладка: Решето Эратосфена.

    function naturalNumber(start, end){ //Задание: Решето Эратосфена.
        var arr = [],
            newarr = [],
            sum = 0;

        if(start<2) start = 2;
        arr.length = start;
        for(var k=start; k <= end; k++){
            arr.push(k)
        }

        var arrlength = arr.length;
        var stop = Math.sqrt(arrlength);
        for(var i = 2, n = 0; i < arrlength; i++){
            if (i < stop) for (n = i + i; n <= arrlength; n += i) {
                arr[n] = "";
            }
            if(arr[i] != "" && arr[i] != undefined){
                newarr.push(arr[i]);
                sum += arr[i];
            }
        }
        return {"sum" : sum, "arr" : newarr};
    }

    $("#lesson7-task2").on("click", function(){
        var start = parseInt($("#arrstart").val());
        var end = parseInt($("#arrend").val());
        var naturalNumberResult = naturalNumber(start, end);
        $(this).next().html("Все натуральные числа в заданном диапазоне: " + naturalNumberResult.arr.join(", "))
            .next().html("Сумма натуральных чисел: " + naturalNumberResult.sum);
    });




    //Вкладка: Подмассив наибольшей суммы.

    function getMaxSubSum(arr) { //Задание: Подмассив наибольшей суммы.
        var arrMark1 = [],
            arrMark2 = [],
            subArr,
            sum = 0,
            accum = 0;

        for (var i = 0; i < arr.length; i++) {
            accum += arr[i];
            if(sum < accum) {
                sum = accum;
                arrMark1[i] = i;
                arrMark2[i] = i;
                subArr = arrMark1;
            }

            if (accum < 0) {
                accum = 0;
                subArr = arrMark2;
                arrMark1.length = 0;
            }
        }
        return {"sum" : sum, "arrMark" : markArrNumbers(subArr, arr)}
    }


    function markArrNumbers(subArr, arr){
        var min = Infinity,
            max = 0;
        for(var a=0; a<subArr.length; a++){
            if(min > subArr[a]) min = subArr[a];
            if(max < subArr[a]) max = subArr[a];
        }
        for(var i = min; i <= max; i++){
            arr[i] = "<span class='mark'>" + arr[i] + "</span>";
        }
        return "[" + arr.join(", ") + "]";
    }


    $("#lesson7-task3").on("click", function(){
        var arr1 = ($("#arrsum").val()).split(",");
        var arr2 = [];
        for(var i=0; i < arr1.length; i++){
            arr2.push(parseInt(arr1[i]));
        }
        var subSum = getMaxSubSum(arr2);
        $(this).next().html("Подмассив наибольшей суммы:<br>" + subSum.arrMark)
            .next().html("Сумма элементов подмассива: " + subSum.sum);
    });
