// 享元模式
let toolTipFactory = (() => {
    let toolTips = [];
    return {
        create() {
            if (toolTips.length) {
                return toolTips.shift();
            } else {
                return document.createElement('div');
            }
        },
        recover(toolTip) { // 对象池回收dom
            return toolTips.push(toolTip);
        }
    }
})();

const testArr = [];
['1', '2'].forEach(val => {  // 创建了两个tooTip
    const toolTip = toolTipFactory.create();
    toolTip.innerHTML = val;
    testArr.push(toolTip);
});

// 回收已使用的toolTip
testArr.forEach(val => {
    toolTipFactory.recover(val);
    testArr.shift();
});

['1', '2', '3', '4'].forEach(val => {
    const toolTip = toolTipFactory.create();
    toolTip.innerHTML = val;
    testArr.push(toolTip);
});


console.log(testArr)
