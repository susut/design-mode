// 命令模式
const menu = {
    refresh() {
        console.log('refresh');
    }
};

const subMenu = {
    add() {
        console.log('add submenu');
    },
    del() {
        console.log('del submenu');
    }
};

const RefreshCommand = function (receiver) {
    this.receiver = receiver;
}
RefreshCommand.prototype.execute = function () {
    this.receiver.refresh()
}

const AddCommand = function (receiver) {
    this.receiver = receiver;
}
AddCommand.prototype.execute = function () {
    this.receiver.add();
}

const refreshCommand = new RefreshCommand(menu);
const addCommand = new AddCommand(subMenu);

const setCommand = function (btn, command) {
    btn.onclick = function () {
        command.execute()
    };
}
const btn1 = {}, btn2 = {};

setCommand(btn1, refreshCommand);
setCommand(btn2, addCommand);

btn1.onclick();
btn2.onclick();

// 宏命令
const doorCommand = {
    execute() {
        console.log('open the door');
    }
}
const tvCommand = {
    execute() {
        console.log('open the tv');
    }
}

class MacroCommand {
    constructor() {
        this.commandList = []
    }

    add(command) {
        this.commandList.push(command);
    }

    execute() {
        this.commandList.forEach(command => {
            command.execute();
        });
    }
}

const commands = new MacroCommand();
commands.add(doorCommand);
commands.add(tvCommand);

commands.execute();


// 命令队列
class JavaCoder {
    execute(task) {
        console.log('java execute: ' + task);
    }
}
class H5Coder {
    execute(task) {
        console.log('h5 execute: ' + task);
    }
}

class SetCommand {
    constructor(receiver, task) {
        this.receiver = receiver;
        this.task = task;
    }

    execute() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.receiver.execute(this.task);
                resolve();
            }, 1000);
        });
    }
}

class CommandQueue {
    constructor() {
        this.commandList = [];
    }

    addCommand(command) {
        this.commandList.push(command);
    }

    async start() {
        if (this.commandList.length) {
            const command = this.commandList.shift();
            await command.execute();
            this.start();
        }
    }
}

const javaCoder = new JavaCoder();
const h5Coder = new H5Coder();

const javaCommand = new SetCommand(javaCoder, 'java work');
const h5Command = new SetCommand(h5Coder, 'h5 work');

const queue = new CommandQueue();
queue.addCommand(javaCommand);
queue.addCommand(h5Command);
queue.start();
