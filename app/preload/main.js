const { ipcRenderer } = require('electron');
const { listen, rebindConsole } = require('./browser-utils');
rebindConsole();

class Clientside {
    constructor() {
        this.store = undefined;
        document.addEventListener('DOMContentLoaded', this.setup.bind(this));
        window.onload = this.removeGoogleAnalytics.bind(this);
    }

    removeGoogleAnalytics() {
        window.ga = undefined;
    }

    setup() {
        listen('click', '*', (event) => {
            if (!this.store.interactiveMode) {
                this.checkforIntlText(event.target);
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

    checkforIntlText(element) {
        const dataset = element.dataset;
        if (dataset.intlKey) {
            ipcRenderer.sendToHost('intl', { value: element.innerHTML, key: dataset.intlKey});
        }
    }
}

new Clientside();