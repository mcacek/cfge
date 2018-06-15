const path = require('path');
const fs = require('fs');
const os = require('os');
const debug = require('debug')('configee:apps');

const defaultAppsPath = '.config/configee/apps';

function buildAppProfile(appsPath, appFile) {
	const appPath = path.resolve(appsPath, appFile);
	const appConfig = require(appPath);
	return Object.assign(appConfig, {
		path: appPath,
		key: appFile
	});
}

function listApps(appsPath) {
	const appFiles = fs.readdirSync(appsPath);
	return appFiles.map(appFile => buildAppProfile(appsPath, appFile));
}

function listTargets(path) {
	return fs.readdirSync(path)
		.filter(filename => filename !== 'index.js')
		.map(filename => {
			return {
				label: filename.split('.')[1].toUpperCase(),
				filename
			};
		});
}

function pad(count) {
	let i = 0;
	let padding = '';

	while (i < count) {
		padding = `  ${padding}`;
		i++;
	}

	return padding;
}

function switchConfig(appsPath, appKey, target) {
	const appProfile = buildAppProfile(appsPath, appKey);
	const targetPath = path.resolve(appProfile.path, `${appProfile.key}.${target}.${appProfile.extension}`);

	fs.createReadStream(targetPath).pipe(fs.createWriteStream(appProfile.dest));
}

module.exports.list = function () {
	debug(`Loading app list`);
	const appsPath = path.resolve(os.homedir(), defaultAppsPath);

	if (fs.existsSync(appsPath)) {
		listApps(appsPath)
			.forEach(appProfile =>
				console.log(`${pad(1)}* ${appProfile.label} (${appProfile.key})`)
			);
	} else {
		throw new Error('Apps path does not exist!');
	}
};

module.exports.show = function (appKey) {
	debug(`Showing app profile ${appKey}`);

	const appsPath = path.resolve(os.homedir(), defaultAppsPath);
	const appProfile = buildAppProfile(appsPath, appKey);

	console.log(`${pad(1)}* ${appProfile.label} (${appProfile.key})`);

	listTargets(path.resolve(appsPath, appKey))
		.forEach(target =>
			console.log(`${pad(2)}- ${target.label}`)
		);
};

module.exports.select = function (appKey, target) {
	debug(`Select app profile ${appKey} with target ${target}`);

	const appsPath = path.resolve(os.homedir(), defaultAppsPath);
	switchConfig(appsPath, appKey, target);
};
