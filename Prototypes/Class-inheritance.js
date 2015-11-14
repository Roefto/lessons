
/* Наследование классов в JavaScript */



//Класс «часы»

function Clock(options) {
	this._template = options.template;
}

Clock.prototype._render = function() {
	var date = new Date();

	var hours = date.getHours();
	if (hours < 10) hours = '0' + hours;

	var min = date.getMinutes();
	if (min < 10) min = '0' + min;

	var sec = date.getSeconds();
	if (sec < 10) sec = '0' + sec;
	var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

	console.log(output);
};

Clock.prototype.start = function() {
	this._render();
	this._timer = setInterval(this._render.bind(this), 1000);
};

Clock.prototype.stop = function() {
	clearInterval(this._timer);
};




//Класс «расширенные часы»

function ExtendedClock(options){
	Clock.apply(this, arguments);
	this._precision = +options.precision || 1000;
}

ExtendedClock.prototype = Object.create(Clock.prototype);

ExtendedClock.prototype.start = function() {
	this._render();
	this._timer = setInterval(this._render.bind(this), this._precision);
};


var clock35 = new ExtendedClock({
	template: 'h:m:s',
	precision: 3000
});
clock35.start();





//Меню с таймером для анимации

function Menu(state) {
	this._state = state || Menu.STATE_CLOSED;
}

Menu.STATE_OPEN = 1;
Menu.STATE_CLOSED = 0;

Menu.prototype.open = function() {
	this._state = Menu.STATE_OPEN;
};

Menu.prototype.close = function() {
	this._state = Menu.STATE_CLOSED;
};

Menu.prototype._stateAsString = function() {
	switch (this._state) {
		case Menu.STATE_OPEN:
			return 'открыто';

		case Menu.STATE_CLOSED:
			return 'закрыто';
	}
};

Menu.prototype.showState = function() {
	alert(this._stateAsString());
};




function AnimatingMenu(){
	Menu.apply(this, arguments);
}

AnimatingMenu.prototype = Object.create(Menu.prototype);

AnimatingMenu.prototype.STATE_ANIMATING = 2;

AnimatingMenu.prototype.open = function() {
	var self = this;
	this._state = this.STATE_ANIMATING;
	this._timerOpen = setTimeout(function(){
		Menu.prototype.open.call(self);
	}, 1000)
};

AnimatingMenu.prototype.close = function() {
	clearTimeout(this._timerOpen);
	Menu.prototype.close.apply(this);
};



AnimatingMenu.prototype._stateAsString = function() {
	switch (this._state) {
		case this.STATE_ANIMATING:
			return 'анимация';

		default:
			return Menu.prototype._stateAsString.call(this);
	}
};


var menu = new AnimatingMenu();

menu.showState(); // закрыто

menu.open();
menu.showState(); // анимация

setTimeout(function() {
	menu.showState(); // открыто

	menu.close();
	menu.showState(); // закрыто (закрытие без анимации)
}, 1000);
