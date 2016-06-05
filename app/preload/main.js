const { ipcRenderer } = require('electron');
const { listen } = require('./browser-utils');

class Clientside {
    constructor() {
        this.store = undefined;
        document.addEventListener('DOMContentLoaded', this.setup);
        window.onload = this.removeGoogleAnalytics;
    }

    removeGoogleAnalytics() {
        window.ga = undefined;
    }

    setup() {
        listen('click', '*', (event) => {
            if (!this.store.interactiveMode) {
                event.preventDefault();
                return false;
            }
        });

        ipcRenderer.on('state', (event, message) => {
            console.log('ClientIPC: ' + message);
            this.store = JSON.parse(message);
            ipcRenderer.sendToHost('state', message.toUpperCase());
        });
    }
}

new Clientside();