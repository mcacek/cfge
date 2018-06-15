const os = require('os');
const path = require('path');

/**
 * Profile configurations are JS files which allows for some dynamic functionality. Avoid using any non-core node 
 * modules as there is no guarantee that they will be installed.
 */

module.exports = {
    // Displayed when listing apps
    label: 'My App',
    // The destination path for the live config
    dest: path.resolve(os.homedir(), 'my-app.yml'),
    // File extension used to filter for config targets
    extension: 'yml',
};
