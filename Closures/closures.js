/* Локальные переменные для объекта */


//Фильтрация через функцию
var someArr  = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b){
	return function(number){
		return number >= a && number <= b;
	}
}

function inArray(arr){
	return function(number){
		return ~arr.indexOf(number);
	}
}

function filter(arr, func){
	return arr.filter(func);
}

console.log(filter(someArr, function(a) {
	return a % 2 == 0
})); // 2,4,6

console.log(filter(someArr, inBetween(3, 6))); // 3,4,5,6
console.log(filter(someArr, inArray([1, 2, 10, 3]))); // 1,2,3



//Армия функций
function makeArmy() {
	var shooters = [];

	for (var i = 0; i < 10; i++) {
		var shooter = function() { // функция-стрелок
			var shooterNumber = i;
			return function(){
				console.log(shooterNumber);
			}
		};
		shooters.push(shooter());
	}
	return shooters;
}

var army = makeArmy();
army[0](); // 0
army[5](); // 5