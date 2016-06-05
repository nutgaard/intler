import {observable, computed, action, useStrict} from 'mobx';
useStrict(true);

class WebviewStore {
    @observable url = 'https://nav.no';
    @observable interactiveMode = false;

    @computed get editMode() {
        return !this.interactiveMode;
    }

    get() {
        return this;
    }

    @action setUrl(url) {
        this.url = url;
    }

    @action setInteractiveMode(isInteractive) {
        this.interactiveMode = isInteractive;
    }
}

export default new WebviewStore();