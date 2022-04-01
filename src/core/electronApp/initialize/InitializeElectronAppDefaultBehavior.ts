import { App, BrowserWindow, dialog } from "electron";
import { inject, injectable } from "inversify";
import { IInitializeElectronAppBehavior } from "./IInitializeElectronAppBehavior";
import { dirname } from "path";
import { Protocol } from "../../protocol/protocol";
import { IBrowserWindowFactory } from "../../browserWindow/create/IBrowserWindowFactory";
import { TYPES } from "../../inversify.types";
import { container } from "../../../inversify.config";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class InitializeElectronAppDefaultBehavior implements IInitializeElectronAppBehavior{
    constructor(
        @inject(TYPES.IBrowserWindowFactory) private _browserWindowFactory: IBrowserWindowFactory
        ){}

    onMainWindowCreated = (mainWindow: BrowserWindow) => {};
    onMainWindowCreatedRegisterEvent(callback: (mainWindow: BrowserWindow) => any): void {
        this.onMainWindowCreated = callback;
    }
    execute(app:App):void{
        let mainWindow: BrowserWindow | null = null;
        app.whenReady().then(()=>{
            //mainWindow.loadURL("https://storm-chess.com");
            mainWindow = this._browserWindowFactory.create();// new BrowserWindowFactory().create();
            this.onMainWindowCreated(mainWindow);
            mainWindow.webContents.on('new-window', (event, url) => {
                console.log("prevented url: "+url)
                event.preventDefault();
                mainWindow?.loadURL(url);
            });
            
            mainWindow.maximize();
            mainWindow.show();
            mainWindow.loadURL("https://storm-chess.com")
        });
        app.on('open-url', (event, url) => {
            //dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
            mainWindow?.loadURL(url);
        })
        console.log("InitializeElectronAppDefaultBehavior")
    }
}