import { observable } from 'mobx';

class WebviewStore {
    @observable url = 'https://nav.no';
}

export default new WebviewStore();