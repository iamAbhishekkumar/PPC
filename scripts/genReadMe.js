const fs = require('fs');

function genReadMe(folderPath) {
    // TODO: put this in templates.js and capitalize first letter
    const readmeContent = `# ${folderPath.split("/")[folderPath.split("/").length - 1]}`;
    fs.appendFile(folderPath + '/README.md', readmeContent, function (err) {
        if (err) throw err;
        console.log('Readme saved!');
    });
}

module.exports = { genReadMe };