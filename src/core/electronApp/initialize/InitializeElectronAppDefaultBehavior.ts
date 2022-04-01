import { App, BrowserWindow, dialog } from "electron";
import { injectable } from "inversify";
import { BrowserWindowFactory } from "../../browserWindow/BrowserWindowFactory";
import { IInitializeElectronAppBehavior } from "./IInitializeElectronAppBehavior";
import { dirname } from "path";
import { Protocol } from "../../protocol/protocol";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class InitializeElectronAppDefaultBehavior implements IInitializeElectronAppBehavior{
    
    onMainWindowCreated = (mainWindow: BrowserWindow) => {};
    onMainWindowCreatedRegisterEvent(callback: (mainWindow: BrowserWindow) => any): void {
        this.onMainWindowCreated = callback;
    }
    execute(app:App):void{
        let mainWindow: BrowserWindow | null = null;
        app.whenReady().then(()=>{
            //mainWindow.loadURL("https://storm-chess.com");
            mainWindow = new BrowserWindowFactory().create();
            this.onMainWindowCreated(mainWindow);
            mainWindow.show();
            mainWindow.loadFile(appDir + "\\assets\\index.html");
        });
        app.on('open-url', (event, url) => {
            //dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
            mainWindow?.loadURL(url);
        })
        console.log("InitializeElectronAppDefaultBehavior")
    }
}