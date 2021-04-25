// 模板方法
class Beverage {
    boilWater() {
        console.log('煮沸水');
    }

    brew() {}

    pourInCup() {}

    init() {
        this.boilWater();
        this.brew();
        this.pourInCup();
    }
}

class Tea extends Beverage {
    constructor() {
        super();
    }

    brew() {
        console.log('冲泡tea');
    }

    pourInCup() {
        console.log('入茶杯');
    }
}


let tea = new Tea();
tea.init();

class Coffee extends Beberage {
    constructor() {
        super();
    }

    brew() {
        console.log('冲泡coffee');
    }

    pourInCup() {
        console.log('入咖杯');
    }
}

let coffee = new Coffee();
coffee.init();
