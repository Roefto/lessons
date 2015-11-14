
/* Встроенные «классы» в JavaScript */

Function.prototype.defer = function(ms){
	var func = this;
	return function(){
		var context = this,
			  args = arguments;
		setTimeout(function(){
			func.apply(context, args)
		}, ms)
	};
	/*
	return function(a, b){
		setTimeout(this.bind(null, a, b), ms)
	}.bind(this)
	*/
};

function fnc(a, b) {
	alert( a + b );
}

fnc.defer(1000)(1, 2); // выведет "привет" через 1 секунду
