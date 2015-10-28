// Статические и фабричные методы

function Article() { // Задание: Счетчик объектов
    this.created = new Date();
    Article.count++;
    Article.lastDate = this.created;
}
Article.count = 0;

Article.showStats = function(){
    console.log('Всего: ' + this.count + ', Последняя: ' + this.lastDate);
};

new Article();
new Article();
Article.showStats(); // Всего: 2, Последняя: (дата)

new Article();
Article.showStats(); // Всего: 3, Последняя: (дата)