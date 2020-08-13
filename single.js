// 单例模式
class Shop {
    constructor() {
        this.goods = []
    }
    buy(goods) {
        this.goods = [...this.goods, ...goods]
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Shop()
        }
        return this.instance
    }
}

const shop1 = Shop.getInstance()
const shop2 = Shop.getInstance()
shop1.buy(['apple', 'mango'])
shop2.buy(['banana', 'tomato'])
console.log(shop1.goods)

