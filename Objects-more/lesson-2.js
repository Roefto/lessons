// Преобразование объектов: toString и valueOf.

    function sum(){ // Задание: Сумма произвольного количества скобок
        var result = 0;
        return function sumNext(a){
            result += a;
            sumNext.toString  = function(){
                return result;
            };
            return sumNext;
        };
    }
    console.log(sum(0)(1)(2)(3)(4)(5));