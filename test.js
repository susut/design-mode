let subscribe =  {
    eventArr: {},

    trigger(eventName, payload) {
        if (this.eventArr[eventName]) {
            this.eventArr[eventName].forEach(cb => {
                cb(payload)
            })
        }
    },

    on(eventName, callback) {
        if (!this.eventArr[eventName]) {
            this.eventArr[eventName] = []
        }
        this.eventArr[eventName].push(callback)
    },

    off(eventName, callback) {
        if (!this.eventArr[eventName]) return
        let index = this.eventArr[eventName].findIndex(cb => cb === callback)
        if (index > -1) {
            this.eventArr[eventName].splice(index, 1)
        }
    },
    once(eventName, callback) {
        let cb = () => {
            callback()
            subscribe.off(eventName, callback)
        }
        subscribe.on(eventName, cb)
    }
}

subscribe.on('event1', function(name) { console.log(name) })
subscribe.trigger('event1', 'name1')

class Group {
    constructor() {
        this.parents = []
        this.msg = ''
    } 
    notify(msg) {
        this.msg = msg
        this.parents.forEach(p => {
            p.update()
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

let group1 = new Group()
let p1 = new Parent('p1', group1)
let p2 = new Parent('p2', group1)

group1.notify('msg1')
group1.notify('msg2')

let callbackList = []
let time = null
let timer = null

function getTimeCb(cb) {
    callbackList.push(cb)
    if (time) {
        callbackList.forEach(callback => {
            callback()
        })
    } else if(!timer) {
        timer = setTimeout(() => {
            time = new Date()
            callbackList.forEach(callback => {
                callback()
            })
            clearTimeout(timer)
            timer = null
        }, 3000)
    }
}

// My name is A, 12
let str = 'My name is {{name}}, {{age}}'
let data = {
    name: 'A',
    age: 12
}
str.replace(/\{\{(\w+)\}\}/ig, function(match, p1) {
    return data[p1]
})

// getElementById
let str1 = 'get-element-by-id'
str1.replace(/-(\w{1})/g, function(match, p1) {
    return p1.toLocaleUpperCase()
})

// 123,467,890
let str2 = '123467890'
str2.replace(/(?!^)(?=(\d{3})+$)/g, '$1,')

let str3 = 'html?a=1&b=2'
