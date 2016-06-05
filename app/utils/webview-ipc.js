class WebViewIPC {
    constructor(webview) {
        this.webview = webview;
        this.hasBeenSetup = false;
        this.listeners = undefined;
    }
    
    setup() {
        this.listeners = {};
        this.webview.addEventListener('ipc-message', (event) => {
            (this.listeners[event.channel] || []).forEach((listener) => {
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
}

export default WebViewIPC;