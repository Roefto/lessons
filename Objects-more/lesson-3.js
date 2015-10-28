/* Создание объектов через «new».
 Задания: Создать Calculator при помощи конструктора,
 Создать Accumulator при помощи конструктора,
 Создайте калькулятор
 */

function Calculator2(){ // Задание: Создать Calculator при помощи конструктора

    this.read = function(){
        this.a = +prompt("a:", 0);
        this.b = +prompt("b:", 0);
    };

    this.sum = function(){
        return this.a + this.b;
    };

    this.mul = function(){
        return this.a * this.b;
    };
}

var calculatorNew = new Calculator2();
calculatorNew.read();

console.log("Сумма=" + calculatorNew.sum());
console.log("Произведение=" + calculatorNew.mul());






function Accumulator(startingValue){  // Задание: Accumulator при помощи конструктора
    this.value = startingValue || 0;
    this.read = function(){
        this.value += +prompt("Добавить:", 0);
    }
}

var accumulator = new Accumulator();
accumulator.read();
accumulator.read();
console.log( accumulator.value );






function Calculator(){  // Задание: Напишите конструктор Calculator, который создаёт расширяемые объекты-калькуляторы.
    var obj = {
        "+" : function(a, b){return a + b},
        "-" : function(a, b){return a - b}
    };

    this.calculate = function(str){
        var name = str.replace(/[0-9a-zа-я\s]/gim,'');
        var num = str.split(name);
        var result = obj[name](+num[0], +num[1]);
        return isNaN(result) ? "Где-то ошибочка" : result;
    };

    this.addMethod = function(name, func){
        obj[name] = func;
    }
}


var calc = new Calculator();



console.log( calc.calculate("3 + 7") ); // 10

var powerCalc = new Calculator;
powerCalc.addMethod("*", function(a, b) {
    return a * b;
});
powerCalc.addMethod("/", function(a, b) {
    return a / b;
});
powerCalc.addMethod("**", function(a, b) {
    return Math.pow(a, b);
});

var result = powerCalc.calculate("2 ** 3");
console.log( result ); // 8