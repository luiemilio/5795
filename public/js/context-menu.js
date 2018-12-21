const win = fin.desktop.Window.getCurrent();

win.addEventListener('blurred', () => {
    win.hide();
});

const devTools = document.querySelector('#dev-tools');
const reloadWin = document.querySelector('#reload-win');
const reloadAll = document.querySelector('#reload-all');

devTools.addEventListener('click', () => {
    win.getOptions((options) => {
        const currentApp = fin.desktop.Application.getCurrent();
        const currentWin = fin.desktop.Window.wrap(currentApp.uuid, options.customData);
        fin.desktop.System.showDeveloperTools(currentApp.uuid, currentWin.name, win.hide);
    });
});

reloadWin.addEventListener('click', () => {
    win.getOptions((options) => {
        const currentApp = fin.desktop.Application.getCurrent();
        const currentWin = fin.desktop.Window.wrap(currentApp.uuid, options.customData);
        currentWin.reload();
        win.hide();
    });
});

reloadAll.addEventListener('click', () => {
    win.getOptions((options) => {
        const currentApp = fin.desktop.Application.getCurrent();
        currentApp.getChildWindows((children) => {
            children.forEach((child, idx, array) => {
                child.reload(() => {
                    if (idx === array.length - 1) {
                        currentApp.getWindow().reload();
                        win.hide();
                    }
                });
            });
        });
    });
});