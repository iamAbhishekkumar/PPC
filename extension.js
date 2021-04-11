const vscode = require('vscode');
const fs = require('fs');

const gen = require('./scripts/generate');
const template = require('./scripts/templates');


// TODO 1 : Add feature to open the project in new window YES(Recommended) OR NO and if yes push to new window over new window, 

// TODO: flask-app template

/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {
	console.log("Active")
	context.subscriptions.push(vscode.commands.registerCommand('ppc.createPythonProject', async () => {
		let currentDirectory = vscode.workspace.workspaceFolders[0].uri.path;
		if (currentDirectory != null) {
			try {
				const options = ['Basic', 'Installable Package', 'Flask-App: Basic', 'Flask-App: Advanced'];
				console.log(options);
				const quickPick = vscode.window.createQuickPick();
				quickPick.items = options.map(label => ({ label }));
				quickPick.onDidChangeSelection(async ([{ label }]) => {
					const folderName = await vscode.window.showInputBox();
					if (folderName != null && folderName.length != 0) {
						switch (label) {
							case "Basic": {
								createBasicStructure(currentDirectory + "/" + folderName, folderName);
								break;
							}
							case "Installable Package": {
								createSinglePackage(currentDirectory + "/" + folderName, folderName);
								break;
							}
							case "Flask-App: Basic": {
								createBasicFlaskAppStructure(currentDirectory + "/" + folderName, folderName);
								break;
							}
							case "Flask-App: Advanced": {
								createAdvancedFlaskAppStructure(currentDirectory + "/" + folderName, folderName);
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
// ├── projectName.py
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
		gen.genGitIgnore(folderPath);
		gen.genFiles(folderPath, `${projectName}.py`, template.projectNamePyHelp);
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath, projectName);
		gen.genFiles(folderPath, "setup.py");
		gen.genFiles(folderPath, "tests.py");
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
//     ├── projectName.py
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
		gen.genFiles(`${folderPath}/app`, "__init__.py", template.initHelp);
		gen.genFiles(`${folderPath}/app`, `${projectName}.py`, template.projectNamePyHelp);
		gen.genFiles(`${folderPath}/app`, "helpers.py");

		fs.mkdirSync(`${folderPath}/tests`);
		gen.genFiles(`${folderPath}/tests`, "tests.py");
		gen.genFiles(`${folderPath}/tests`, "helpers_tests.py");

		gen.genGitIgnore(folderPath);
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath, projectName);
		gen.genFiles(folderPath, "setup.py");
		gen.genEnvironment(folderPath);

	} else {
		alreadyExistsMessage(folderPath);
	}
}

// FLASKAPP :Basic
// projectName
// │
// ├── app
// │   ├── __init__.py
//     ├── projectName.py
// │   ├── views.py
// │   ├── models.py
// │   ├── helpers.py
// │   └── static
// │       └── main.css
// │   └── templates
// │       └── index.html
// ├── config.py
// ├── .gitignore
// ├── LICENSE
// ├── README.md
// ├── requirements.txt



function createBasicFlaskAppStructure(folderPath, projectName) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
		fs.mkdirSync(`${folderPath}/app`);
		gen.genFiles(`${folderPath}/app`, "__init__.py", template.initHelp);
		gen.genFiles(`${folderPath}/app`, `${projectName}.py`, template.projectNamePyHelp);
		gen.genFiles(`${folderPath}/app`, "views.py");
		gen.genFiles(`${folderPath}/app`, "models.py");
		gen.genFiles(`${folderPath}/app`, "helpers.py");

		fs.mkdirSync(`${folderPath}/app/static`);
		gen.genFiles(`${folderPath}/app/static`, "main.css");

		fs.mkdirSync(`${folderPath}/app/templates`);
		gen.genFiles(`${folderPath}/app/templates`, "index.html");

		gen.genFiles(folderPath, "config.py", "# All your permanent configurations goes here.");
		gen.genGitIgnore(folderPath);
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath, projectName);
		gen.genEnvironment(folderPath);
	} else {
		alreadyExistsMessage(folderPath);
	}
}

// FLASKAPP : Advance
// projectName
//  ├── app
//  │   ├── __init__.py
//  |   ├── projectName.py
//  │   ├── extensions.py
//  │   │
//  │   ├── helpers
//  │   │   ├── __init__.py
//  │   │   ├── views.py
//  │   │   ├── models.py
//  │   │   └── commands.py
//  │   │
//  │   ├── auth
//  │   │   ├── __init__.py
//  │   │   ├── routes.py
//  │   │   ├── views.py
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
//  │       └── test_views.py
//  │
//  ├── config.py
//  ├── wsgi.py
//  ├── requirements.txt
//  └── README.md 

function createAdvancedFlaskAppStructure(folderPath, projectName) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
		fs.mkdirSync(`${folderPath}/app`);
		gen.genFiles(`${folderPath}/app`, "__init__.py", template.initHelp);
		gen.genFiles(`${folderPath}/app`, `${projectName}.py`, template.projectNamePyHelp);
		gen.genFiles(`${folderPath}/app`, "extensions.py");

		fs.mkdirSync(`${folderPath}/app/helpers`);
		gen.genFiles(`${folderPath}/app/helpers`, "__init__.py");
		gen.genFiles(`${folderPath}/app/helpers`, "views.py");
		gen.genFiles(`${folderPath}/app/helpers`, "models.py");
		gen.genFiles(`${folderPath}/app/helpers`, "commands.py");

		fs.mkdirSync(`${folderPath}/app/auth`);
		gen.genFiles(`${folderPath}/app/auth`, "__init__.py");
		gen.genFiles(`${folderPath}/app/auth`, "routes.py");
		gen.genFiles(`${folderPath}/app/auth`, "views.py");
		gen.genFiles(`${folderPath}/app/auth`, "models.py");
		gen.genFiles(`${folderPath}/app/auth`, "forms.py", "# Create your http forms here");
		gen.genFiles(`${folderPath}/app/auth`, "commands.py", "# Custom terminal commands to ease your workflow. ");

		fs.mkdirSync(`${folderPath}/app/ui`);
		fs.mkdirSync(`${folderPath}/app/ui/static`);
		fs.mkdirSync(`${folderPath}/app/ui/templates`);

		fs.mkdirSync(`${folderPath}/app/ui/static/css`);
		gen.genFiles(`${folderPath}/app/ui/static/css`, "style.css");
		fs.mkdirSync(`${folderPath}/app/ui/static/js`);
		gen.genFiles(`${folderPath}/app/ui/static/js`, "custom.js");

		gen.genFiles(`${folderPath}/app/ui/templates`, "404.html");
		gen.genFiles(`${folderPath}/app/ui/templates`, "500.html");
		gen.genFiles(`${folderPath}/app/ui/templates`, "base.html");


		fs.mkdirSync(`${folderPath}/tests`);
		gen.genFiles(`${folderPath}/tests`, "__init__.py");
		gen.genFiles(`${folderPath}/conftest`, "__init__.py");

		fs.mkdirSync(`${folderPath}/tests/auth`);
		gen.genFiles(`${folderPath}/tests/auth`, "__init__.py");
		gen.genFiles(`${folderPath}/tests/auth`, "test_views.py");


		gen.genGitIgnore(folderPath);
		gen.genLicense(folderPath);
		gen.genReadMe(folderPath, projectName);
		gen.genFiles(folderPath, "main.py");
		gen.genFiles(folderPath, "config.py", "# All your permanent configurations goes here.");
		gen.genFiles(folderPath, "wsgi.py", "# wsgi module to integrate app with web servers like apache, gunicorn. ");
		gen.genEnvironment(folderPath);

	} else {
		alreadyExistsMessage(folderPath);
	}
}




function alreadyExistsMessage(folderPath) {
	vscode.window.showErrorMessage(`Already exists a folder named as ${folderPath.split("/")[folderPath.split("/").length - 1]}`);
}

module.exports = {
	activate,
	deactivate
}

