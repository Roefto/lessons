
/* 

Привязка контекста и карринг: «bind»

*/


//Логирующий декоратор (много аргументов)
function work(a) {
	console.log(a);
}

function makeLogging(f, log) {
	return function(){
		log.push([].slice.call(arguments));
		f.call(this, arguments)
	}
}

var log = [];
work = makeLogging(work, log);

work(1, 2); 
work(5, 9); 

for (var i = 0; i < log.length; i++) {
	alert( 'Лог:' + log[i] ); 
}



//Кеширующий декоратор
function fM(x) {
	 return Math.random() * x;
}

function makeCaching(func) {
	var cache = {};
	return function(value){
		if (!(value in cache)) cache[value] = func.call(null, +value);
		return cache[value];
	}
}

fM = makeCaching(fM);

var a, b;

a = fM(1);
b = fM(1);
alert(a == b); 

b = fM(2);
alert(a == b);