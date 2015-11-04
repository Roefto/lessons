
/* 

Явное указание this: «call», «apply» 

*/


// Перепишите суммирование аргументов
function sumArgs() { 
	/*
	 arguments.reduce = [].reduce;
	 return arguments.reduce(function(a, b){
		return a + b;
	 })
	 */
	return [].reduce.call(arguments, function(a, b){
		return a + b
	})
}

console.log(sumArgs(1, 2, 3));




// Примените функцию к аргументам
function applyAll(func){ 
	return func.apply(null, [].slice.call(arguments, 1))
}


function sum1() {
	return [].reduce.call(arguments, function(a, b) {
		return a + b;
	});
}

function mul1() {
	return [].reduce.call(arguments, function(a, b) {
		return a * b;
	});
}

console.log(applyAll(sum1, 1, 2, 3)); 
console.log(applyAll(mul1, 2, 3, 4));