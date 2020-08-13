// 发布订阅模式
class Publish {
    constructor() {
        this.event = {}
    }
    emit(eventName) {
        if (this.event[eventName]) {
            this.event[eventName].forEach(callback => {
                callback()
            })
        }
    }
    on(eventName, callback) {
        if (!this.event[eventName]) {
            this.event[eventName] = []
        }
        this.event[eventName].push(callback)
    }
    off(eventName, callback) {
        if (!this.event[eventName]) { return }
        const index = this.event[eventName].findIndex(cb => cb === callback)
        if (index > -1) {
            this.event[eventName].splice(index, 1)
        }
    }
    once(eventName, callback) {
        let cb = () => {
            callback()
            this.off(eventName, cb)
        }
        this.on(eventName, cb)
    }
}

const publish = new Publish()
function callback1() {
    console.log('event1')
}
function callback2() {
    console.log('event2')
}

publish.on('event1', callback1)
publish.on('event1', callback1)
publish.off('event1', callback1)

publish.once('event2', callback2)

publish.emit('event1')
publish.emit('event2')
publish.emit('event2')