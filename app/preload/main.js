const { ipcRenderer } = require('electron');
const { listen, rebindConsole } = require('./browser-utils');
rebindConsole();

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
        listen('keydown', '*', (event) => {
            console.log('keydown', event.target);
        });

        ipcRenderer.on('state', (event, message) => {
            this.store = JSON.parse(message);
            if (this.store.ipcdebug) {
                console.log('ClientIPC: ', this.store);
            }
            ipcRenderer.sendToHost('state', this.store);
        });
    }
}

new Clientside();