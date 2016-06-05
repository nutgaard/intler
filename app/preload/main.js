const {ipcRenderer} = require('electron');

const run = () => {
    // Remove google analytics
    window.ga = undefined;
    console.log('remove GA');

    const listen = (eventType, scope, callback) => {
        document.body.addEventListener(eventType, (event) => {
            let node = event.target;
            while (node !== document.body) {
                console.log('checking ' + node.nodeName);
                if (node.matches(scope)) {
                    console.log('matched');
                    callback(event);
                    break;
                }
                node = node.parentNode;
            }
        });
    };

    listen('click', '*', (event) => {
        console.log('preventing');
        event.preventDefault();
        event.stopImmediatePropagation();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    });

    ipcRenderer.on('ping', () => {
        ipcRenderer.sendToHost('pong');
    });
    ipcRenderer.sendToHost('test');
};

document.addEventListener('DOMContentLoaded', run);
