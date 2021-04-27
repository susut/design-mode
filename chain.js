// 职责链模式
// 同步职责链
// orderType 1 500定金；2 200定金 、 pay 是否已支付定金、stock 库存
let order500 = (orderType, pay, stock) => {
    if (orderType === 1 && pay) {
        console.log('500定金，得100优惠券');
    } else {
        return 'nextProcessor';
    }
}

let order200 = (orderType, pay, stock) => {
    if (orderType === 2 && pay) {
        console.log('200定金，得50优惠券');
    } else {
        return 'nextProcessor';
    }
}

let orderNormal = (orderType, pay, stock) => {
    if (stock) {
        console.log('普通购买，不得优惠券');
    } else {
        console.log('莫得购买');
    }
}

class Chain {
    constructor(fn) {
        this.fn = fn;
        this.processor = null;
    }

    setNextProcessor(processor) {
        return this.processor = processor;
    }

    passRequest() {
        const res = this.fn.apply(this, arguments);
        if (res === 'nextProcessor') {
            return this.processor && this.processor.passRequest(...arguments);
        }
        return res;
    }

    next() {
        return this.processor && this.processor.passRequest(...arguments);
    }
}

const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);
chainOrder500.setNextProcessor(chainOrder200);
chainOrder200.setNextProcessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder200.passRequest(1, true, 500);

// 异步职责链
let fn1 = new Chain(() => {
    console.log(1);
    return 'nextProcessor';
});

let fn2 = new Chain(function() {
    console.log(2);
    setTimeout(() => {
        this.next();
    }, 1000);
});

let fn3 = new Chain(() => {
    console.log(3);
});

fn1.setNextProcessor(fn2).setNextProcessor(fn3);
fn1.passRequest();