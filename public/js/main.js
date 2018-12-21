//event listeners.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof fin != 'undefined') {
        fin.desktop.main(onMain);
    } else {
        ofVersion.innerText =
            'OpenFin is not available - you are probably running in a browser.';
    }
});

//once the DOM has loaded and the OpenFin API is ready
function onMain() {
    //get a reference to the current Application.
    const app = fin.desktop.Application.getCurrent();
    const win = fin.desktop.Window.getCurrent();

    //we get the current OpenFin version
    fin.desktop.System.getVersion(version => {
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = version;
    });

    let counter = 0;

    const counterP = document.querySelector('#counter');

    setInterval(() => {
        counterP.innerText = counter++;
    }, 500);

    const childWinBtn = document.querySelector('#child-win');

    childWinBtn.addEventListener('click', () => {
        new fin.desktop.Window({
            name: `${Math.random() * 99999}`,
            url: 'http://localhost:5555/index.html',
            autoShow: true
        });
    });

    const contextMenu = new fin.desktop.Window({
        name: 'context-menu: ' + Math.random() * 9999999,
        url: 'http://localhost:5555/context-menu.html',
        frame: false,
        defaultHeight: 140,
        defaultWidth: 200,
        saveWindowState: false,
        alwaysOnTop: true,
        customData: win.name,
        shadow: true
    });

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.setBounds(e.screenX, e.screenY, null, null, () => {
            contextMenu.show(() => {
                contextMenu.focus();
            });
        });
    });
}
