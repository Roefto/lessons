// Методы объектов, this. Задания: Создайте калькулятор, Цепочка вызовов.

var calculator = { // Задание Создайте калькулятор

    read : function(){
         this.a = +prompt("a:", 0);
         this.b = +prompt("b:", 0);
    },

    sum : function(){
        return this.a + this.b;
    },

    mul : function(){
        return this.a * this.b;
    }
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());



var ladder = { // Задание Цепочка вызовов
    step: 0,
    up: function() {
        this.step++;
        return this;
    },
    down: function() {
        this.step--;
        return this;
    },
    showStep: function() {
        console.log( this.step );
        return this;
    }
};
ladder.up().up().down().up().down().showStep(); // 1