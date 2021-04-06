const vscode = require('vscode');
const fs = require('fs');
const template = require('./scripts/templates');


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
					if (label == 'basic') {
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
		fs.appendFile(folderPath + '/.gitignore', template.gitIgnoreContent, function (err) {
			if (err) throw err;
			console.log('gitignore saved !');
		});

		fs.appendFile(folderPath + '/main.py', "", function (err) {
			if (err) throw err;
			console.log('main.py saved!');
		});

		
		// TODO :  Give option for creating LICENSE TYPE
		fs.appendFile(folderPath + '/LICENSE', "", function (err) {
			if (err) throw err;
			console.log('LICENSE saved!');
		});

		// TODO: put this in templates.js and capitalize first letter
		const readmeContent = `# ${folderPath.split("/")[folderPath.split("/").length - 1]}`;
		fs.appendFile(folderPath + '/README.md', readmeContent, function (err) {
			if (err) throw err;
			console.log('Readme saved!');
		});

		fs.appendFile(folderPath + '/setup.py', "", function (err) {
			if (err) throw err;
			console.log('setup.py saved!');
		});

		fs.appendFile(folderPath + '/tests.py', "", function (err) {
			if (err) throw err;
			console.log('tests.py saved!');
		});

	}
}







module.exports = {
	activate,
	deactivate
}

