import {observable, computed, action, useStrict} from 'mobx';
useStrict(true);

class WebviewStore {
    @observable ipcdebug = true;
    @observable url = 'https://tjenester.nav.no/veiledearbeidssoker';
    @observable urlbar = 'https://tjenester.nav.no/veiledearbeidssoker';
    @observable interactiveMode = true;

    @computed get editMode() {
        return !this.interactiveMode;
    }

    @computed get editModeIcon() {
        return this.interactiveMode ? 'I' : 'E';
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
}

export default new WebviewStore();