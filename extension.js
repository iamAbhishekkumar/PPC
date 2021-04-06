const vscode = require('vscode');
const fs = require('fs');

const genEnvironment = require('./scripts/genEnvironment');
const genGitIgnore = require('./scripts/genGitIgnore');
const genLicense = require('./scripts/genLicense');
const genPyFiles = require('./scripts/genPyFiles');
const genReadME = require('./scripts/genReadMe');
/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {
	console.log("Active")
	context.subscriptions.push(vscode.commands.registerCommand('ppc.createPythonProject', async () => {
		let currentDirectory = vscode.workspace.workspaceFolders[0].uri.path;
		if (currentDirectory != null) {
			vscode.window.showInformationMessage(currentDirectory);
			try {
				const options = ['Basic', 'Installable Single Package', 'flask-App'];
				console.log(options);
				const quickPick = vscode.window.createQuickPick();
				quickPick.items = options.map(label => ({ label }));
				quickPick.onDidChangeSelection(async ([{ label }]) => {
					if (label == 'Basic') {
						console.log("User chooses basic");
						const folderName = await vscode.window.showInputBox();
						createBasicTemplate(currentDirectory + "/" + folderName);
					}
					quickPick.hide();
				});
				quickPick.show();
				quickPick.onDidHide(() => quickPick.dispose());

			}
			catch (err) {
				console.log(err)
				vscode.window.showInformationMessage("Unexpected Error Occured");
			};

		} else
			vscode.window.showInformationMessage("Not valid directory selected");
	}));


}
exports.activate = activate;


function deactivate() { }


// folder_generated/
// │
// ├── .gitignore
// ├── main.py
// ├── LICENSE
// ├── README.md
// ├── requirements.txt
// ├── setup.py
// └── tests.py

function createBasicTemplate(folderPath) {
	console.log(folderPath);
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
		genGitIgnore.createGitIgnore(folderPath);
		genPyFiles.genPyFiles(folderPath, "main");
		genLicense.genLicense(folderPath);
		genReadME.genReadMe(folderPath);
		genPyFiles.genPyFiles(folderPath, "setup");
		genPyFiles.genPyFiles(folderPath, "tests");
		genEnvironment.genEnvironment(folderPath);
	}
}







module.exports = {
	activate,
	deactivate
}

