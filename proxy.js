// 图片预加载 
let myImage = (() => {
    const imgNode = document.createElement('img')
    document.body.appendChild(imgNode)

    return {
        setSrc: src => {
            imgNode.src = src
        }
    }
})()

let proxyImage = (() => {
    let img = new Image
    img.onload = function() {
        myImage.setSrc(img.src)
    }
    
    return {
        setSrc: src => {
            myImage.setSrc('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.a0bi.com%2Fupload%2Fttq%2F20140711%2F1405066128222.gif&refer=http%3A%2F%2Fimg3.a0bi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618728123&t=dd9f0f81696fa58ca15ceaac45b9d510')
            img.src = src
        }
    }
})()

proxyImage.setSrc('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F81%2Fda%2Ffb%2F81dafbebb62f91a53146efe81af11c53.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618728520&t=2c5460a5d18e9bfaf0c2f38e68e14bd8')


// 合并http请求
let asyncLog = (id) => {
    console.log('id为：' + id)
}

let proxyAsyncLog = (() => {
    let cache = []
    let timer

    return (id) => {
        cache.push(id)
        if (timer) return
        timer = setTimeout(() => {
            asyncLog(cache.join(','))
            clearTimeout(timer)
            cache = []
        }, 2000)
    }
})()

setTimeout(() => { proxyAsyncLog(1) }, 200)
setTimeout(() => { proxyAsyncLog(3) }, 600)
setTimeout(() => { proxyAsyncLog(1) }, 1000)
setTimeout(() => { proxyAsyncLog(6) }, 1500)
setTimeout(() => { proxyAsyncLog(9) }, 2500)


// 惰性加载，不想写了o(╥﹏╥)o