import {observable, computed, action, useStrict} from 'mobx';
useStrict(true);

class WebviewStore {
    @observable ipcdebug = true;
    @observable url = 'https://nav.no';
    rerenderWebview = false;
    @observable interactiveMode = true;

    @computed get editMode() {
        return !this.interactiveMode;
    }

    @action setUrl(url) {
        this.url = url;
        this.rerenderWebview = false;
    }

    @action updateUrl(url) {
        this.url = url;
        this.rerenderWebview = true;
    }

    @action setInteractiveMode(isInteractive) {
        this.interactiveMode = isInteractive;
    }
}

export default new WebviewStore();