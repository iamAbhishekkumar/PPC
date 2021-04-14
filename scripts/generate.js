const fs = require('fs');
const vscode = require('vscode');
const template = require('./templates');
const commands = require('./commands');


// TODO: Add details to files which file is used for what
function genGitIgnore(folderPath) {
    fs.appendFile(folderPath + '/.gitignore', template.gitIgnoreContent, function (err) {
        if (err) throw err;
        console.log('gitignore saved !');
    });
}



function genEnvironment(folderPath, additionalCommand = "") {
    const originalFolderPath = folderPath;
    folderPath = `'${folderPath}'`;  // to fix that if their is space in between the path.
    const terminal = vscode.window.createTerminal(`bash`);
    terminal.show(true);
    terminal.sendText(`cd ${folderPath}`);
    terminal.sendText(`python3 -m venv env || python -m venv env`);
    terminal.sendText(`source ${folderPath}/env/bin/activate`);
    if (additionalCommand != "")
        terminal.sendText(additionalCommand); // can be used for pip install flask
    terminal.sendText(`pip freeze > ${folderPath}/requirements.txt`);
    terminal.sendText(`deactivate`);
    // terminal.sendText(`exit`);
    sleep(4000).then(() => commands.openInNewWindow(originalFolderPath));
}


function genLicense(folderPath) {
    // TODO :  Give option for creating LICENSE TYPE
    fs.appendFile(folderPath + '/LICENSE', "", function (err) {
        if (err) throw err;
        console.log('LICENSE saved!');
    });
}


function genFiles(folderPath, fileName, content = "") {
    fs.appendFile(`${folderPath}/${fileName}`, content, function (err) {
        if (err) throw err;
        console.log(`${fileName}`);
    });
}


function genReadMe(folderPath, projectName) {
    // TODO: put this in templates.js and capitalize first letter
    const readmeContent = `# ${projectName}`;
    fs.appendFile(folderPath + '/README.md', readmeContent, function (err) {
        if (err) throw err;
        console.log('Readme saved!');
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms), reject => console.log("rejected"));
}
module.exports = {
    genGitIgnore,
    genEnvironment,
    genLicense,
    genFiles,
    genReadMe
}