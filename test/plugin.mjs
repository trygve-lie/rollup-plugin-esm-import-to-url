import plugin from '../src/plugin';
import rollup from 'rollup';
import path from 'path';
import url from 'url';
import tap from 'tap';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const simple = `${__dirname}/../utils/modules/simple/main.js`;
const basic = `${__dirname}/../utils/modules/basic/main.js`;

tap.test('plugin() - target is not an absolute URL - should reject process', (t) => {
    const options = {
        input: simple,
        plugins: [plugin({
            external: {
                'foo': './foo'
            }
        })],
    }
    t.rejects(rollup.rollup(options), new Error('External target must be an absolute URL.'));
    t.end();
});

tap.test('plugin() - target is refered to in external - should reject process', (t) => {
    const options = {
        input: simple,
        external: ['foo'],
        plugins: [plugin({
            external: {
                'foo': 'http://not.a.host.com'
            }
        })],
    }
    t.rejects(rollup.rollup(options), new Error('Module to be mapped must not be pressent in the Rollup external config. Please remove module from the Rollup external config.'));
    t.end();
});

tap.test('plugin() - basic module - should replace lit-element with CDN url', async (t) => {
    const options = {
        input: basic,
        onwarn: (warning, warn) => {
            // Supress logging
        },
        plugins: [plugin({
            external: {
                'lit-element': 'https://cdn.pika.dev/lit-element/v2'
            }
        })],
    }

    const bundle = await rollup.rollup(options);
    const { output } = await bundle.generate({ format: 'esm' });

    t.matchSnapshot(output[0].code.split('\r').join(''), 'basic example');
    t.end();
});

tap.test('plugin() - simple module - should replace lit-element with CDN url', async (t) => {
    const options = {
        input: simple,
        onwarn: (warning, warn) => {
            // Supress logging
        },
        plugins: [plugin({
            external: {
                'lit-element': 'https://cdn.pika.dev/lit-element/v2'
            }
        })],
    }

    const bundle = await rollup.rollup(options);
    const { output } = await bundle.generate({ format: 'esm' });

    t.matchSnapshot(output[0].code.split('\r').join(''), 'simple example');
    t.end();
});