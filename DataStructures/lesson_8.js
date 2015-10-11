
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


	
	
	
	
	
	
	
	//Перевести текст вида border-left-width в borderLeftWidth
	function camelize(str){
		var arr = str.split("-");
		for (var i = 1; i < arr.length; i++) {
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
		}
		return arr.join("");
	}
	console.log(camelize("list-style-image"));


	//Фильтрация массива «на месте»
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
	var notReversed = [5, 2, 1, -10, 8];
	function sortReversed(a, b){
		return b - a;
	}
	notReversed.sort(sortReversed);
	console.log(notReversed);


	//Скопировать и отсортировать массив
	var origArr = ["HTML", "JavaScript", "CSS"];
	var copypArrSorted = origArr.slice().sort();
	console.log(origArr);
	console.log(copypArrSorted);


	//Случайный порядок в массиве
	var rndArr = [1, 2, 3, 4, 5];
	function randomPosition(a, b){
		return Math.random() - 0.5;
	}
	rndArr.sort(randomPosition);
	console.log(rndArr);


	//Сортировка объектов
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