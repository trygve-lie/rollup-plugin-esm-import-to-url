const notUrl = url => url.substr(0, 4) !== 'http';

export default function esmExternalToUrl({
    map = {},
} = {}) {
	const mapping = new Map();

    return {
        name: 'rollup-plugin-esm-external-to-url',

        buildStart(options) {
			Object.keys(map).forEach(key => {
				if (options.external.includes(key)) throw Error('Module to be mapped must not be set as external. Please remove module from the external config.');
				if (notUrl(map[key])) throw Error('Mapping target must be an absolute URLs');
				mapping.set(key, map[key]);
			});
        },

        resolveId(importee, importer) {
			const url = mapping.get(importee);
			if (url) {
				return {
					id: url,
					external: true
				};
			}
        }
    };
}
