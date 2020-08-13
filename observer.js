// 观察者模式
class Group {
    constructor() {
        this.parents = []
        this.msg = ''
    }
    notify(msg) {
        this.msg = msg
        this.parents.forEach(parent => {
            parent.update()
        })
    }
    attach(parent) {
        this.parents.push(parent)
    }
}

class Parent {
    constructor(name, group) {
        this.name = name
        this.group = group
        this.group.attach(this)
    }
    update() {
        console.log(this.name, this.group.msg)
    }
}

const group = new Group()
const p1 = new Parent('p1', group)
const p2 = new Parent('p2', group)
const p3 = new Parent('p3', group)

group.notify('msg1')
group.notify('msg2')
