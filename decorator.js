// 装饰器模式
class Man {
    run() {
        console.log('run')
    }
}

class Decorator {
    constructor(old) {
        this.oldAbility = old.run
    }
    fly() {
        console.log('fly')
    }
    newAbility() {
        this.oldAbility()
        this.fly()
    }
}

const man = new Man()
const superMan = new Decorator(man)
superMan.fly()