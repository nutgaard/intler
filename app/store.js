import {observable, computed, action, useStrict} from 'mobx';
useStrict(true);

class WebviewStore {
    @observable ipcdebug = true;
    @observable url = 'https://nav.no';
    @observable urlbar = 'https://nav.no';
    @observable interactiveMode = true;

    @computed get editMode() {
        return !this.interactiveMode;
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
}

export default new WebviewStore();