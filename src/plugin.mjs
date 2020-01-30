const notUrl = (url) => url.substr(0, 4) !== 'http';

const notBare = (str) => str.startsWith('/') || str.startsWith('./') || str.startsWith('../');

export default function esmImportToUrl({
    imports = {},
} = {}) {
    const mapping = new Map();

    return {
        name: 'rollup-plugin-esm-import-to-url',

        buildStart(options) {
            Object.keys(imports).forEach((key) => {
                const value = Array.isArray(imports[key]) ? imports[key][0] : imports[key];

                if (notBare(key)) return;

                if (options.external.includes(key)) throw Error('Import specifier must NOT be present in the Rollup external config. Please remove specifier from the Rollup external config.');
                if (notUrl(value)) throw Error('Target for import specifier must be an absolute URL.');

                mapping.set(key, value);
            });
        },

        resolveId(importee) {
            const url = mapping.get(importee);
            if (url) {
                return {
                    id: url,
                    external: true
                };
            }

            return null;
        }
    };
}
