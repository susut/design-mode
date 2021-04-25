// 组合模式
class Folder {
    constructor(name) {
        this.name = name;
        this.parent = null;
        this.files = [];
    }
    
    add(file) {
        file.parent = this;
        this.files.push(file);
    }

    scan() {
        console.log('开始扫描文件夹：' + this.name);
        this.files.forEach(file => {
            file.scan();
        });
    }

    remove() {
        if (!this.parent) return;
        
        this.parent.files.forEach((val, i) => {
            if (val === this) {
                this.parent.files.splice(i, 1);
                return;
            }
        });
    }
}

class File {
    constructor(name) {
        this.name = name;
        this.parent = null;
    }

    add() {
        throw new Error('文件下不允许添加文件');
    }

    scan() {
        console.log('扫描文件' + this.name);
    }

    remove() {
        if (!this.parent) return;
        this.parent.files.forEach((val, i) => {
            if (val === this) {
                this.parent.files.splice(i, 1);
                return;
            }
        });
    }
}


const folder1 = new Folder('folder1');
const folder2 = new Folder('folder2');

const file1 = new File('file1');
const file2 = new File('file2');
const file3 = new File('file3');

folder1.add(file3);
folder1.add(folder2);
folder2.add(file1);
folder2.add(file2);

folder2.remove();

folder1.scan();
