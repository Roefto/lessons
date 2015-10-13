
    /* Дата и Время. Задания: Имя дня недели, День указанное количество дней назад,
     Последний день месяца, Сколько секунд уже прошло сегодня, Сколько секунд – до завтра,
     Вывести дату в формате дд.мм.гг, Относительное форматирование даты*/
    
	
	
	// Имя дня недели
    var newDate =  new Date(2012,0,2);
    function getWeekDay(date){
        var days = ["Воскресенье",
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота"];
        return days[date.getDay()];
    }
    console.log(getWeekDay(newDate));


	
	// День указанное количество дней назад
    function getDateAgo(date, days) {
        var dateCopy = date;
        dateCopy.setDate(date.getDate() - days);
        return dateCopy.getDate();
    }
    console.log( getDateAgo(newDate, 1) ); // 1, (1 января 2015)


	
	// Последний день месяца?
    function getLastDayOfMonth(year, month){
        var date = new Date(year, month + 1, 0);
        return date.getDate();
    }
    console.log(getLastDayOfMonth(2012, 1));


	
	// Сколько секунд уже прошло сегодня?
    function getSecondsToday(){
        var dateNow = new Date();
        var dateZero = new Date(dateNow.getFullYear(),
            dateNow.getMonth(), dateNow.getDate()) ;

        return ((dateNow - dateZero) / 1000);
    }
    console.log(getSecondsToday());

	

	// Сколько секунд – до завтра?
    function getSecondsToTomorrow(){
        var dateNow = new Date();
        var dateZero = new Date(dateNow.getFullYear(),
            dateNow.getMonth(), dateNow.getDate() + 1) ;

        return ((dateZero - dateNow ) / 1000);
    }
    console.log(getSecondsToTomorrow());

	

	// Вывести дату в формате дд.мм.гг
    var date =  new Date(2001, 0, 1);
    function formatD(date){
        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        return date.toLocaleString("ru", options);
    }
    console.log(formatDate(date));


	
	// Относительное форматирование даты
    function formatDate(date){
        var currentDate = new Date();
        var time = currentDate - date;
        var second = 1000;
        var minute = 60 * second;
        var hour = 60 * minute;

        if(time < second){
            return "Только что"
        } else if(time < minute){
            return time / second + " сек. назад"
        } else if(time < hour){
            return Math.round(time / minute) + " мин. назад"
        }else{
            var options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            return date.toLocaleString("ru", options);
        }
    }
    console.log( formatDate(new Date(new Date - 1)) ); // только что
    console.log( formatDate(new Date(new Date - 30 * 1000)) ); // 30 сек. назад
    console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // 5 мин. назад
    console.log( formatDate(new Date(new Date - 86400 * 1000)) ); // вчерашняя дата в формате "дд.мм.гг чч:мм"
});
