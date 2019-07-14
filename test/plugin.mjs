import HttpServer from '../utils/HttpServer';
import plugin from '../src/plugin';
import rollup from 'rollup';
import path from 'path';
import url from 'url';
import tap from 'tap';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const simple = `${__dirname}/../utils/modules/simple/assets/main.js`;

tap.test('plugin() - target is not an absolute URL - should reject process', (t) => {
    const options = {
        input: simple,
        plugins: [plugin({
            map: {
                'foo': './foo'
            }
        })],
    }
    t.rejects(rollup.rollup(options), new Error('Mapping target must be an absolute URLs'));
    t.end();
});

tap.test('plugin() - target is refered to in external - should reject process', (t) => {
    const options = {
        input: simple,
        external: ['foo'],
        plugins: [plugin({
            map: {
                'foo': 'http://not.a.host.com'
            }
        })],
    }
    t.rejects(rollup.rollup(options), new Error('Module to be mapped must not be set as external. Please remove module from the external config.'));
    t.end();
});
