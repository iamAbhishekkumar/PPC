const vscode = require('vscode');
const fs = require('fs');

const gen = require('./scripts/generate');

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
						if (folderName.length != 0) {
							createBasicTemplate(currentDirectory + "/" + folderName);
						}
						else
							vscode.window.showErrorMessage("Enter a valid project name");

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
		gen.createGitIgnore(folderPath);
		gen.genPyFiles(folderPath, "main");
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath);
		gen.genPyFiles(folderPath, "setup");
		gen.genPyFiles(folderPath, "tests");
		gen.genEnvironment(folderPath);



	}
}







module.exports = {
	activate,
	deactivate
}

