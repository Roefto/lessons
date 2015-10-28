// Дескрипторы, геттеры и сеттеры свойств

function User(fullName) { // Задание: Добавить get/set-свойства
    this.fullName = fullName;

    Object.defineProperties(this, {
        firstName: {
            get: function() {
                return this.fullName.split(" ")[0];
            },
            set: function(value) {
                this.fullName = value + " " + this.lastName;
            }
        },

        lastName: {
            get: function () {
                return this.fullName.split(" ")[1];
            },
            set: function (value) {
                this.fullName = value + " " + this.firstName;
            }
        }
    });

}
var vasya1 = new User("Василий Попкин");

console.log( vasya1.fullName );

// чтение firstName/lastName
console.log( vasya1.firstName ); // Василий
console.log( vasya1.lastName ); // Попкин

// запись в lastName
vasya1.lastName = 'Сидоров';

console.log( vasya1.fullName ); // Василий Сидоров