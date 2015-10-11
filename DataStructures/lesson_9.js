
	/* Массив: перебирающие методы. Задания: Массив частичных сумм,
	   Перепишите цикл через map*/

	//Массив частичных сумм
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




