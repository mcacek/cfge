const meow = require('meow');

module.exports = function () {
	return meow(`
    Options
        --list    -l  List apps
        --info    -i  Show app targets
        --profile -p  App ID
        --target  -t  The target config
    `, {
		flags: {
			list: {
				alias: 'l'
			},
			info: {
				type: 'string',
				alias: 'i'
			},
			profile: {
				type: 'string',
				alias: 'p'
			},
			target: {
				type: 'string',
				alias: 't'
			}
		}
	});
};
