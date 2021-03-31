const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ppc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ppc.createPythonProject', function () {
		// vscode.window.showInformationMessage('Creating Your Project........');
		try {
			let currentDirectoryPath = vscode.workspace.workspaceFolders[0].uri.path;
			
			vscode.window.showInformationMessage(message);
		} catch (err) {
			vscode.window.showInformationMessage("Not valid directory selected");
		}


	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
