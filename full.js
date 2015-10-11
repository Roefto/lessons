$(document).ready(function(){

    $('.inner').hide();
    $(".title").on("click", function(){
        $(this).next().stop(true, true).slideToggle(300, function(){scroll($(this))})
               .parent().siblings().children(".inner").slideUp(300);
    });

    var ready = true;
    $("button").on("click", function(){
        if(ready == true){
            scroll($(this).parent());
            ready = false;
        }

    });

    function scroll(obj){
        var offset = obj.parent().height() + obj.parent().offset().top;
        if(offset > $(window).height()){
            document.onmousewheel = function(e) {e.preventDefault()};
            $("html,body").animate({"scrollTop": offset}, 2000, function(){
                document.onmousewheel = "";
                ready = true;
            });
        }
    }

    $("input, textarea").on("focus", function(){$(this).val("")});
    $("input").on("keyup", function(event){
        if(event.keyCode == 13){
            $(this).next("button").click();
        }
    });

/*-----------------------------Задания-------------------------------*/

    /*-----------Числа. Задания: Интерфейс суммы, Сложение цен, Получить дробную часть числа, Формула Бине-----------*/

    //Вкладка: Интерфейс суммы. Сложение цен. Дробная часть.

    $("#lesson1-task1").on("click", function(){ //Задания: Интерфейс суммы, Сложение цен, Получить дробную часть числа.
        var first_number = +prompt("Введите первое число", "");
        var second_number = +prompt("Введите второе число", "");

        var sum = first_number + second_number;
        alert("Сумма чисел: " + sum.toFixed(2) + "$\r\n" +
              "Дробная часть: " + getDecimal(sum));
    });

    function getDecimal(number) {
        return +(number - parseInt((number + "").split(".")[0])).toFixed(9);
    }

    //Вкладка: Формула Бине

    function fib(n) {
        var a = 1,
            b = 0,
            x;
        for (var i = 0; i < n; i++) {
            x = a + b;
            a = b;
            b = x;
        }
        return b;
    }

    function fibBinet(n){ // Числа. Задание: Формула Бине.
        var fi = (1 + Math.sqrt(5)) / 2;
        return Math.round(Math.pow(fi, n) / Math.sqrt(5));
    }

    $("#lesson1-task2").on("click", function(){
        var n = parseInt($("#fibBinet").val());
        $(this).next().html("Число Фибоначчи: " + fib(n)).next().html("Формула Бине: " + fibBinet(n));
    });






    /*-------Строки. Задания: Сделать первый символ заглавным, Проверьте спам, Усечение строки, Выделить число.-------*/

    //Вкладка: Сделать первый символ заглавным. Проверить спам.

    function ucFirst(strng){ //Задание: Сделать первый символ заглавным.
       return strng.length > 0 ? "   &#8594;   " + strng.charAt(0).toUpperCase() +  strng.slice(1) : "Пусто :с";
    }

    function checkSpam(strng){ //Задание: Проверьте спам.
        var target = ["xxx", "ххх", "viagra"];
        for(var i = 0; i < target.length; i++){
            if(~strng.toLowerCase().indexOf(target[i])) return "СПАМ!";
        }
        return "Не спам.";
    }

    $("#lesson2-task1").on("click", function(){
        var strng = $("#ucFirst").val();
        $(this).next().html(strng + ucFirst(strng))
               .next().html(checkSpam(strng));
    });


    //Вкладка: Усечение строки. Выделить число.

    function extractCurrencyValue(strng){ //Задание: Выделить число.
        var result = "Все числа из текста, начинающиеся на \"$\":<br>";
        var start = 0;
        while (true) {
            var matches = strng.indexOf("$", start);
            if (matches == -1) break;
            var sliced = parseInt(strng.slice(matches + 1)); //parseFloat
            if(sliced != "" && !isNaN(sliced)) result += "$" + sliced + "<br>";
            start = matches + 1;
         }
        /*
        var arr = strng.split("$");
        for(var i = 0; i < arr.length; i++){
            if(arr[i] != "" && !isNaN(parseInt(arr[i]))) result += parseInt(arr[i]) + "$" + "<br>";
        }
        */
        return result;
    }

    function truncate(strng, maxlength){ //Задание: Усечение строки.
        var ml = 0;
        if(maxlength >= 3) ml = maxlength - 3;
        return (!isNaN(maxlength) && strng.length > maxlength) ? strng.slice(0, ml) + "..." : strng;
    }

    $("#lesson2-task2").on("click", function(){
        var strng = $("#truncate").val();
        var maxlength = parseInt($("#l2-t2__input").val());
        $(this).next().html(truncate(strng, maxlength))
               .next().html(extractCurrencyValue(strng));
    });




    /*-----------Объекты: перебор свойств. Задания: Определите, пуст ли объект, Сумма свойств,
     Свойство с наибольшим значением, Умножьте численные свойства на 2.-----------*/

    var arr = {};
    function setArr(key, vl){ //Задание: Определите, пуст ли объект.
        if(key in arr){
            if(arr[key] != vl){
                arr[key] = vl;
                return ("Новое значение свойства \"" + key + "\": \"" + vl + "\".");
            }else{
                delete arr[key];
                return ("Свойства \"" + key + "\" больше нет");
            }
        }else{
            arr[key] = vl;
            return ("Свойство \"" + key + "\" добавлено, значение: \"" + vl + "\".");
        }

    }


    function salaries(id){ //Задания: Сумма свойств, Свойство с наибольшим значением.
        var salary = {
            "sum" : 0,
            "maxvalue" : 0,
            "maxvalue_name" : ""
        };
        for(var key in arr){
            var keyvalue = parseInt(arr[key]);
            if(isNumeric(keyvalue)){
                salary.sum += keyvalue;
                if(salary.maxvalue < keyvalue) {
                    salary.maxvalue = keyvalue;
                    salary.maxvalue_name = key;
                }
            }
        }
        return(salary[id]);
    }


    $("#lesson5-task1--multiple").on("click", function(){ //Задание: Умножьте численные свойства на 2.
        for(var key in arr){
            if(isNumeric(parseInt(arr[key]))) arr[key] = parseInt(arr[key])*2;
        }
        $(this).next().html("Значения увеличины в 2 раза")
            .next().html("Сумма всех числовых значений: " + salaries("sum"))
            .next().html("Максимальное значение у свойства \"" + salaries("maxvalue_name") + "\": "
                                                               + salaries("maxvalue"));
    });


    $("#lesson5-task1").on("click", function(){
        var obj = $(this).siblings("input");
        if(obj.hasClass("empt") || obj.val() == ""){
            $(".empt").addClass("err");
        }else{
            var key = $("#isEmpty1").val();
            var vl = $("#isEmpty2").val();
            $(this).next().next().html(setArr(key, vl))
                   .next().html("Сумма всех числовых значений: " + salaries("sum"))
                   .next().html("Максимальное значение у свойства \"" + salaries("maxvalue_name") + "\": "
                                                                      + salaries("maxvalue"));
        }
    });


    $(".empt").on("blur", function(){
        if($(this).val() != "") $(this).removeClass();
    });










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





    /*-----------Массивы: методы. Задания: Добавить класс в строку,
     Перевести текст вида border-left-width в borderLeftWidth,
     Функция removeClass, Фильтрация массива «на месте», Сортировать в обратном порядке,
     Скопировать и отсортировать массив, Случайный порядок в массиве,
     Сортировка объектов, Вывести односвязный список, Отфильтровать анаграммы
     Оставить уникальные элементы массива-----------*/



    //Вкладка: Добавить класс в строку, Функция removeClass

    var obj = {
        className: 'my menu menu menu menu'
    };
    var arrClass = obj.className.split(" ");
    function setClass(cls){ //Задание: Добавить класс в строку, Функция removeClass.
        //var arr = obj.className.split(" ");
        var added = false;
        for(var i = 0; i < arrClass.length; i++) {
            if(arrClass[i] == cls) {
                arrClass.splice(i, 1);
                added = true;
                i--;
            }
        }
        if(added == false) arrClass.push(cls);
        return arrClass.join(" ");
    }

    $("#lesson8-task1").on("click", function(){
        var cls = $("#setClass").val();
        $(this).next().html("Новый список классов:<br>" + setClass(cls));
    });


    //Вкладка: Отфильтровать анаграммы.

    function aclean(arr){ //Задание: Отфильтровать анаграммы.
        var sortArr = [];
        for(var i = 0; i < arr.length; i++){
            sortArr.push(arr[i].toLowerCase().split("").sort().join(""));
        }
        for(var h = 0; h < arr.length; h++){
            for(var j = h + 1; j < arr.length; j++){
                if(sortArr[h] == sortArr[j]) arr.splice(j--, 1);
            }
        }
        return arr.join(", ");
    }

    $("#lesson8-task2").on("click", function(){
        var anagrams = $("#anagrams").val().split(" ");
        $(this).next().html("Отфильтрованные анаграммы:<br>" + aclean(anagrams));
    });


    //Вкладка: Оставить уникальные элементы массива.

    function unique(arr) { //Задание: Оставить уникальные элементы массива.
        var obj = {};
        var result = [];
        for(var i = 0; i < arr.length; i++)obj[arr[i]] = true;
        for(var key in obj)result.push(key);
        return result.join(", ");
    }

    $("#lesson8-task3").on("click", function(){
        var strings = $("#unique").val().split(" ");
        $(this).next().html("Все уникальные элементы:<br>" + unique(strings));
    });



    /* Далее идет много простых заданий из тем:
     Массивы: методы, Массив: перебирающие методы,
     Псевдомассив аргументов «arguments».

     Можно включить их выполнение и отображение в консоли,
     изменив значение otherTasks на true.
    */
    var otherTasks = true; // Включить выполнение следующих заданий?
    if(otherTasks == true){


        /* Массивы: методы. Задания: Перевести текст вида border-left-width в borderLeftWidth,
         Фильтрация массива «на месте», Сортировать в обратном порядке,
         Скопировать и отсортировать массив, Случайный порядок в массиве,
         Сортировка объектов, Вывести односвязный список*/

        //Перевести текст вида border-left-width в borderLeftWidth
        console.log("-----------------------------------");
        console.log("Перевести текст вида border-left-width в borderLeftWidth");
        function camelize(str){
            var arr = str.split("-");
            for (var i = 1; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            return arr.join("");
        }
        console.log(camelize("list-style-image"));


        //Фильтрация массива «на месте»
        console.log("-----------------------------------");
        console.log("Фильтрация массива «на месте»");
        var filterRange = [5, 3, 8, 1];
        function filterRangeInPlace(arr, a, b) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < a || arr[i] > b) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
        filterRangeInPlace(filterRange, 1, 4);
        console.log(filterRange);


        //Сортировать в обратном порядке
        console.log("-----------------------------------");
        console.log("Сортировать в обратном порядке");
        var notReversed = [5, 2, 1, -10, 8];
        function sortReversed(a, b){
            return b - a;
        }
        notReversed.sort(sortReversed);
        console.log(notReversed);


        //Скопировать и отсортировать массив
        console.log("-----------------------------------");
        console.log("Скопировать и отсортировать массив");
        var origArr = ["HTML", "JavaScript", "CSS"];
        var copypArrSorted = origArr.slice().sort();
        console.log(origArr);
        console.log(copypArrSorted);


        //Случайный порядок в массиве
        console.log("-----------------------------------");
        console.log("Случайный порядок в массиве");
        var rndArr = [1, 2, 3, 4, 5];
        function randomPosition(a, b){
            return Math.random() - 0.5;
        }
        rndArr.sort(randomPosition);
        console.log(rndArr);


        //Сортировка объектов
        console.log("-----------------------------------");
        console.log("Сортировка объектов");
        var vasya = { name: "Вася", age: 23 };
        var masha = { name: "Маша", age: 18 };
        var vovochka = { name: "Вовочка", age: 6 };
        var people = [ vasya , masha , vovochka ];

        function ageSort(a, b){
            return a.age - b.age
        }
        people.sort(ageSort);

        for(var i = 0; i < people.length; i++) {
            console.log(people[i].name);
        }


        //Вывести односвязный список
        console.log("-----------------------------------");
        console.log("Вывести односвязный список");
        var list = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: 4,
                        next: null
                    }
                }
            }
        };

        console.log("Цикл");
        function printReverseListCycle(list){
            var somearr = list;
            var newArr1 = [];
            while(somearr){
                newArr1.push(somearr.value);
                somearr = somearr.next;
            }
            for(var i = newArr1.length - 1; i >= 0; i--){
                console.log(newArr1[i])
            }
        }
        printReverseListCycle(list);

        console.log("Рекурсия");
        function printReverseListRecurs(list) { //Копипаст

            if (list.next) {
                printReverseListRecurs(list.next);
            }
            console.log(list.value)
        }
        printReverseListRecurs(list);




        /* Массив: перебирающие методы. Задания: Массив частичных сумм,
           Перепишите цикл через map*/

        //Массив частичных сумм
        console.log("-----------------------------------");
        console.log("Массив частичных сумм");
        var arr1 = [1, 2, 3, 4, 5];
        function getSums(arr){
            var result = [];
            arr.reduce(function(sum, current) {
                result.push(sum + current);
                return sum + current;
            }, 0);
            return result;
        }
        console.log(getSums(arr1));



        //Перепишите цикл через map
        console.log("-----------------------------------");
        console.log("Перепишите цикл через map");
        var names = ["Есть", "жизнь", "на", "Марсе"];
        var nameLengths = names.map(function(name) {
            return name.length;
        });
        /* Копирование массива через map.
        var nameLengths = names.map(function(item ,name) {
            return item;
        });
        */
        console.log( nameLengths );




        /* Псевдомассив аргументов «arguments».
        Задания: Проверка на аргумент-undefined, Сумма аргументов*/

        //Проверка на аргумент-undefined
        console.log("-----------------------------------");
        console.log("Проверка на аргумент-undefined");
        function f(x) {
          return arguments.length;
        }
        console.log(f(undefined));
        console.log(f());


        //Сумма аргументов
        console.log("-----------------------------------");
        console.log("Сумма аргументов");
        function argSum(){
            var sum = 0;
            for(var i = 0; i < arguments.length; i++){
                sum += arguments[i];
            }
            return sum;
        }
        console.log(argSum());
        console.log(argSum(1));
        console.log(argSum(1, 2));
        console.log(argSum(1, 2, 3));
        console.log(argSum(1, 2, 3, 4));



    }

});
