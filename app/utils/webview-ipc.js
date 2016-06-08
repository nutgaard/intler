const debug = (event, ...args) => {
    console.warn('Uncaugth ipc, channel:', event.channel);
    console.log(...args);
};

class WebViewIPC {
    constructor(webview) {
        this.webview = webview;
        this.hasBeenSetup = false;
        this.listeners = undefined;
    }
    
    setup() {
        this.hasBeenSetup = true;
        this.listeners = {};
        this.webview.addEventListener('ipc-message', (event) => {
            console.log('IPCRECEIVE', event.channel, ...event.args);
            (this.listeners[event.channel] || [debug]).forEach((listener) => {
                listener(event, ...event.args);
            });
        });
    }
    
    on(channel, callback) {
        if (!this.hasBeenSetup) {
            this.setup();
        }

        const listeners = this.listeners[channel] || [];
        listeners.push(callback);
        this.listeners[channel] = listeners;
    }

    send(channel, message) {
        console.log('IPCSEND', channel, message);
        this.webview.send(channel, message);
    }
}

export default WebViewIPC;