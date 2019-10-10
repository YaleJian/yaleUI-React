// 引入electron并创建一个Browserwindow
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let win;

function createWindow () {
    //创建浏览器窗口,宽高自定义具体大小
    win = new BrowserWindow({width: 1280, height: 800});

    //加载应用-----  electron-quick-start中默认的加载入口
      /*win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))*/
    // 加载应用----适用于 react 项目
    // win.loadURL(`file://${path.join(__dirname, './react/build/index.html')}`);
    win.loadURL('https://yalejian.com/');

    // 打开开发者工具，默认不打开
    win.webContents.openDevTools();

    // 关闭window时触发下列事件.
    win.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法,部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (win === null) {
        createWindow()
    }
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。


//自定义dock菜单
const dockMenu = Menu.buildFromTemplate([
    {
        label: 'New Window',
        click () { console.log('New Window') }
    }, {
        label: 'New Window with Settings',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    },
    { label: 'New Command...' }
]);

app.dock.setMenu(dockMenu);