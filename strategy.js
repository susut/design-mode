// 策略模式
class Strategy {
    static bankAccount(money) {
        return money > 50 ? money * 0.7 : money
    }
    static alipay(money) {
        return money * 0.9
    }
    static creditCard(money) {
        return money
    }
}

function userPay(strategy, money) {
    return Strategy[strategy](money)
}

console.log(userPay('bankAccount', 60))
console.log(userPay('alipay', 60))
console.log(userPay('creditCard', 60))