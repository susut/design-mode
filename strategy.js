var strategies = {
    isEmpty: function (value, errMsg) {
        if (!value) {
            return errMsg
        }
    },
    maxLen: function (value, len, errMsg) {
        if (value.length > Number(len)) {
            return errMsg
        }
    }
}

class Validate {
    constructor() {
        this.cache = []
    }
    start() {
        let msg
        this.cache.forEach(c => {
            msg = strategies[c.key].apply(this, c.arg)
            if (msg) {
                return msg
            }
        })
        return msg
    }
    add(value, rules) {
        rules.forEach(rule => {
            const ruleArr = rule.method.split(':')
            let argArr = [value]
            const key = ruleArr.shift()
            argArr = argArr.concat(ruleArr)
            argArr.push(rule.msg)
            this.cache.push({
                key,
                arg: argArr
            })
        })
    }
}

const vali = new Validate()
vali.add('188888', [
    { method: 'isEmpty', msg: 'value is empty' },
    { method: 'maxLen:10', msg: 'value is too Long' }
])
console.log(vali.start())