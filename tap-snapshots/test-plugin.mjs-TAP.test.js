/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/plugin.mjs TAP plugin() - basic module - should replace lit-element with CDN url > basic example 1`] = `
import { html } from 'https://cdn.pika.dev/lit-element/v2';

const render = (world) => {
    return html\`<p>Hello \${world}!</p>\`;
};
render();

`

exports[`test/plugin.mjs TAP plugin() - simple module - should replace lit-element with CDN url > simple example 1`] = `
import { html } from 'https://cdn.pika.dev/lit-element/v2';

function replaceElement(target, element) {
    target.replaceWith(element);
    return element;
}

function firstElement(element) {
    return element.firstElementChild;
}

function view(items) {
    return html\`<p>Hello \${items[0]}!</p>\`;
}

function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function data() {
    return [
        random(0, 20),
        random(20, 40),
        random(40, 60),
        random(60, 80),
        random(80, 100),
    ];
}

class App {
    constructor(root) {
        this.root = root;
    }

    render() {
        const items = data();
        const el = view(items);
        this.root = replaceElement(this.root, el);
    }

    update() {
        setInterval(() => {
            this.render();
        }, 1000);
    }
}

const ready = () => {
    return new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('app');
            resolve(firstElement(el));
        });
    });
};

const start = async () => {
    const el = await ready();
    const app = new App(el);
    app.render();
    app.update();
};
start();

`
