'use strict';

const cli = require('./lib/cli')();
const apps = require('./lib/apps');

if (cli.flags.list) {
	apps.list();
} else if (cli.flags.info) {
	apps.show(cli.flags.info);
} else if (cli.flags.profile && cli.flags.target) {
	apps.select(cli.flags.profile, cli.flags.target);
} else {
	cli.showHelp();
}
