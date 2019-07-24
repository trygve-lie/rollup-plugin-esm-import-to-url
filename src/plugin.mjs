const notUrl = url => url.substr(0, 4) !== 'http';

export default function esmImportToUrl({
    imports = {},
} = {}) {
    const mapping = new Map();

    return {
        name: 'rollup-plugin-esm-import-to-url',

        buildStart(options) {
            Object.keys(imports).forEach((key) => {
                const value = Array.isArray(imports[key]) ? imports[key][0] : imports[key];

                if (options.external.includes(key)) throw Error('Module to be mapped must not be pressent in the Rollup external config. Please remove module from the Rollup external config.');
                if (notUrl(value)) throw Error('External target must be an absolute URL.');

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
