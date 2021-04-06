const { exec } = require('child_process');
const vscode = require('vscode');

function genEnvironment(folderPath) {
    exec(`cd ${folderPath} &&  python3 -m venv env || python -m venv env`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error ${error.message}`);
            return;
        }
        if (stderr) {
            vscode.window.showErrorMessage("Problem, occured while ccreating environment");
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`Successfully, environment created`);
    });
}

module.exports = { genEnvironment };