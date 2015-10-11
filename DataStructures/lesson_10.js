 
 /* Псевдомассив аргументов «arguments».
	Задания: Проверка на аргумент-undefined, Сумма аргументов*/

	//Проверка на аргумент-undefined
	function f(x) {
	  return arguments.length;
	}
	console.log(f(undefined));
	console.log(f());


	//Сумма аргументов
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
