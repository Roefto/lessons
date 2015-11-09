function Machine(power) {
	this._power = power;
	this._enabled = false;

	var self = this;

	this.enable = function() {
		self._enabled = true;
	};

	this.disable = function() {
		self._enabled = false;
	};
}



	function CoffeeMachine(power, capacity) {
	Machine.apply(this, arguments);

	var waterAmount = 0,
		WATER_HEAT_CAPACITY = 4200,
		timerId;

	function getTimeToBoil() {
		return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
	}

	this.setWaterAmount = function(amount) {
		// ... проверки пропущены для краткости
		waterAmount = amount;
	};

	this.getWaterAmount = function(amount) {
		return waterAmount;
	};

	function onReady() {
		alert( 'Кофе готов!' );
	}

	this.setOnReady = function(func){
		onReady = func;
	};

	this.run = function() {
		if(!this._enabled) throw new Error("Кофеварка выключена");
		timerId = setTimeout(function(){onReady()}, getTimeToBoil());
	};

	this.isRunning = function(){
		return !!timerId
	};

	var parentEnable = this.disable;
	this.disable = function(){
		parentEnable(arguments);
		clearTimeout(timerId);
	};
}



	function Fridge(power){
	Machine.apply(this, arguments);
	var food = [],
		maxOfFood = power / 100;

	this.addFood = function(){
		if(!this._enabled)
			throw  new Error("Холодильник выключен");
		if(arguments.length + food.length > maxOfFood)
			throw  new Error("Слишком много еды!");

		for(var key in arguments){
			food.push(arguments[key])
		}
	};

	this.getFood = function(){
		return food.slice();
	};


	this.filterFood = function(func){
		return food.filter(func);
	};

	this.removeFood = function(value){
		return food = food.filter(function(item) {
			return item.title != value.title;
		});
	};

	var parentDisable = this.disable;
	this.disable = function(){
		if(food.length)
			throw new Error("В холодильнике есть еда");
		parentDisable();
	}
}



var fridge = new Fridge(500);
fridge.enable();
fridge.addFood({
	title: "котлета",
	calories: 100
});
fridge.addFood({
	title: "сок",
	calories: 30
});
fridge.addFood({
	title: "зелень",
	calories: 10
});
fridge.addFood({
	title: "варенье",
	calories: 150
});

fridge.removeFood("нет такой еды"); // без эффекта
alert( fridge.getFood().length ); // 4

var dietItems = fridge.filterFood(function(item) {
	return item.calories < 50;
});

dietItems.forEach(function(item) {
	alert( item.title ); // сок, зелень
	fridge.removeFood(item);
});

alert( fridge.getFood().length ); // 2

fridge.disable(); // ошибка, в холодильнике есть еда