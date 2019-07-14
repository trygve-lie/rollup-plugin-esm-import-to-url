import { replaceElement } from '../utils/dom.js';
import * as views from './views.js';
import { data } from '../data/data.js';

export default class App {
    constructor(root) {
        this.root = root;

    }

    render() {
        const items = data();
        const el = views.valueList(items);
        this.root = replaceElement(this.root, el);
    }

    update() {
        setInterval(() => {
            this.render();
        }, 1000);
    }
}
