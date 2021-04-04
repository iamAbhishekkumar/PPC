const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log("Active")
	context.subscriptions.push(vscode.commands.registerCommand('ppc.createPythonProject', async () => {
		let currentDirectoryPath = vscode.workspace.workspaceFolders[0].uri.path;
		if (currentDirectoryPath != null) {
			vscode.window.showInformationMessage(currentDirectoryPath);
			try {
				const options = ['basic','advance','flask-App'];
				console.log(options);
				const quickPick = vscode.window.createQuickPick();
				quickPick.items = options.map(label => ({ label }));
				quickPick.onDidChangeSelection(([{ label }]) => {
					if(label == 'basic'){
						console.log("User chooses basic");
						
					}
				});
				quickPick.show();
				quickPick.onDidHide(() => quickPick.dispose());

			}
			catch (err) {
				console.log(err)
			};

		} else
			vscode.window.showInformationMessage("Not valid directory selected");
	}));


}
exports.activate = activate;


function deactivate() { }

module.exports = {
	activate,
	deactivate
}
