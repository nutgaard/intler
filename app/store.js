import {observable, computed, action, useStrict} from 'mobx';
useStrict(true);
const ipc = window.require('electron').ipcRenderer;

class WebviewStore {
    constructor() {
        ipc.on('hotkey', (event, message) => {
            const handler = eval(message);
            handler(this);
        })
    }

    @observable ipcdebug = true;
    @observable url = 'https://tjenester.nav.no/veiledearbeidssoker/?sprak=nb&cmskeys';
    @observable urlbar = 'https://tjenester.nav.no/veiledearbeidssoker/?sprak=nb&cmskeys';
    @observable interactiveMode = true;
    @observable intlkey = null;
    @observable intlvalue = null;

    @computed get editMode() {
        return !this.interactiveMode;
    }

    @computed get editModeIcon() {
        return this.interactiveMode ? 'I' : 'E';
    }

    @computed get completestate() {
        return { ipcdebug: this.ipcdebug, url: this.url, urlbar: this.urlbar, interactiveMode: this.interactiveMode };
    }

    @action setUrl(url) {
        if (url != this.url) {
            this.url = url;
        }
    }

    @action setUrlbar(url) {
        if (url != this.urlbar) {
            this.urlbar = url;
        }
    }

    @action gotoUrl(url) {
        this.url = url;
        this.urlbar = url;
    }

    @action setInteractiveMode(isInteractive) {
        this.interactiveMode = isInteractive;
    }

    @action toggleInteractive() {
        this.interactiveMode = !this.interactiveMode;
    }

    @action intlselection(key, value) {
        this.intlkey = key;
        this.intlvalue = value;
    }
}

export default new WebviewStore();