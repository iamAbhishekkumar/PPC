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
			try {
				const options = ['Basic', 'Installable Package', 'Flask-App'];
				console.log(options);
				const quickPick = vscode.window.createQuickPick();
				quickPick.items = options.map(label => ({ label }));
				quickPick.onDidChangeSelection(async ([{ label }]) => {
					const folderName = await vscode.window.showInputBox();
					if (folderName.length != 0) {
						switch (label) {
							case "Basic": {
								createBasicStructure(currentDirectory + "/" + folderName, folderName);
								break;
							}
							case "Installable Package": {
								createSinglePackage(currentDirectory + "/" + folderName, folderName);
								break;
							}

						}
					}
					else
						vscode.window.showErrorMessage("Enter a valid project name");
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


// projectName/
// │
// ├── .gitignore
// ├── main.py
// ├── LICENSE
// ├── README.md
// ├── requirements.txt
// ├── setup.py
// └── tests.py
// └── env


function createBasicStructure(folderPath, projectName) {
	console.log(folderPath);
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
		gen.createGitIgnore(folderPath);
		gen.genPyFiles(folderPath, "main");
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath, projectName);
		gen.genPyFiles(folderPath, "setup"); // TODO: Add setup.py template
		gen.genPyFiles(folderPath, "tests");
		gen.genEnvironment(folderPath);
	}
	else {
		alreadyExistsMessage(folderPath);
	}
}

// projectName
// │
// ├── app
// │   ├── __init__.py
// │   ├── helloworld.py
// │   └── helpers.py
// │
// ├── tests
// │   ├── folder_name_tests.py
// │   └── helpers_tests.py
// │
// ├── .gitignore
// ├── LICENSE
// ├── README.md
// ├── requirements.txt
// └── setup.py
// └── env


function createSinglePackage(folderPath, projectName) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);

		fs.mkdirSync(`${folderPath}/app`);
		gen.genPyFiles(`${folderPath}/app`, "__init__");
		gen.genPyFiles(`${folderPath}/app`, "main");
		gen.genPyFiles(`${folderPath}/app`, "helpers");

		fs.mkdirSync(`${folderPath}/tests`);
		gen.genPyFiles(`${folderPath}/tests`, "tests");
		gen.genPyFiles(`${folderPath}/tests`, "helpers_tests");

		gen.createGitIgnore(folderPath);
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath, projectName);
		gen.genPyFiles(folderPath, "setup");

		gen.genEnvironment(folderPath);

	} else {
		alreadyExistsMessage(folderPath);
	}
}

// projectName
// │
// ├── app
// │   ├── __init__.py
// │   ├── views.py
// │   ├── models.py
// │   ├── helpers.py
// │   └── static
// │       └── main.css
// │   └── templates
// │       └── index.html
// ├── .gitignore
// ├── LICENSE
// ├── README.md
// ├── requirements.txt
// └── main.py



function createFlaskAppStructure(folderPath, projectName) {
	if (!fs.existsSync(folderPath)) {

	}
}


// projectName
//  ├── app
//  │   ├── __init__.py
//  │   ├── extensions.py
//  │   │
//  │   ├── helpers
//  │   │   ├── __init__.py
//  │   │   ├── controllers.py
//  │   │   ├── models.py
//  │   │   └── commands.py
//  │   │
//  │   ├── auth
//  │   │   ├── __init__.py
//  │   │   ├── routes.py
//  │   │   ├── controllers.py
//  │   │   ├── models.py
//  │   │   ├── forms.py
//  │   │   └── commands.py
//  │   │
//  │   └── ui
//  │       ├── static
//  │       │   ├── css
//  │       │   │   └── styles.css
//  │       │   └── js
//  │       │       └── custom.js
//  │       │
//  │       └── templates
//  │           ├── 404.html
//  │           ├── 500.html
//  │           └── base.html
//  │
//  ├── tests
//  │   ├── __init__.py
//  │   ├── conftest.py
//  │   │   
//  │   └── auth
//  │       ├── __init__.py
//  │       └── test_controllers.py
//  │
//  ├── config.py
//  ├── instance
//  │   └── config.py
//  ├── wsgi.py
//  │
//  ├── requirements.txt
//  └── README.md 

function alreadyExistsMessage(folderPath) {
	vscode.window.showErrorMessage(`Already exists a folder named as ${folderPath.split("/")[folderPath.split("/").length - 1]}`);
}






module.exports = {
	activate,
	deactivate
}

