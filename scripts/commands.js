const vscode = require('vscode');


async function openInNewWindow(folderPath) {
    const choice = await vscode.window.showInformationMessage("Do you want to open project in new window ?", 'Yes', 'No');
    console.log(choice);
    if (choice != null) {
        if (choice === "Yes") {
            try {
                await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(folderPath));
            } catch (error) {
                console.log(error);
            }
        }
    }
    else vscode.window.showErrorMessage("Next time, choose a valid option");
}

module.exports = { openInNewWindow };