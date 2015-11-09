function f1() {
	return "Готов!";
}

var fj = debounce(f1, 1000);

function debounce(f, ms){
	var ready = true;
	return function(){
		if(ready){
			ready = false;
			console.log(f());
			setTimeout(function(){ready = true}, ms)
		} else {
			console.log("Не готов :с");
		}
	}
}


fj(1); // выполнится сразу же
fj(2); // игнор

setTimeout( function() { fj(3) }, 100); // игнор (прошло только 100мс)
setTimeout( function() { fj(4) }, 1100); // выполнится
setTimeout( function() { fj(5) }, 1500); // игнор