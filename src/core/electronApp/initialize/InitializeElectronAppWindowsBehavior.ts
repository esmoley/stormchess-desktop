import { BrowserWindow, dialog } from "electron";
import { injectable } from "inversify";
import { BrowserWindowFactory } from "../../browserWindow/BrowserWindowFactory";
import { IInitializeElectronAppBehavior } from "./IInitializeElectronAppBehavior";
import { dirname } from "path";
import { Protocol } from "../../protocol/protocol";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class InitializeElectronAppWindowsBehavior implements IInitializeElectronAppBehavior{
    onMainWindowCreated = (mainWindow: BrowserWindow) => {};
    onMainWindowCreatedRegisterEvent(callback: (mainWindow: BrowserWindow) => any): void {
        this.onMainWindowCreated = callback;
    }

    execute(app: Electron.App) : BrowserWindow|null{
        let mainWindow: BrowserWindow|null = null;
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            app.quit()
        } else {
            app.on('second-instance', (event, argv, workingDirectory) => {
                // Someone tried to run a second instance, we should focus our window.
                if (mainWindow) {
                    if (mainWindow.isMinimized()) mainWindow.restore()
                        mainWindow.focus()
                }
                try{
                    let url = this.argsToUrl(argv);
                    this.loadUrl(url, mainWindow);
                }catch(ex){
                    console.error(ex);
                }
                
            })
            app.whenReady().then(()=>{
                mainWindow = new BrowserWindowFactory().create();
                this.onMainWindowCreated(mainWindow);
                mainWindow.show();
                    // Keep only command line / deep linked arguments
                try{
                    let url = this.argsToUrl(process.argv);
                    this.loadUrl(url, mainWindow);
                }catch(ex){
                    console.error(ex);
                    console.log("loading default url");
                    mainWindow.loadURL("https://storm-chess.com")
                }
                ;
                //mainWindow.loadFile(appDir + "\\assets\\index.html");
            });
            app.on('open-url', (event, url) => {
                this.loadUrl(url, mainWindow);
            })
            app.on('window-all-closed', function () {
                app.quit()
            })
            //console.log(process.argv.slice(1));
            //dialog.showErrorBox(process.argv.slice(1)+"",process.argv.slice(1)+"");
            //this.logEverywhere(process.argv.slice(1)+"", mainWindow);
        }
        console.log("InitializeElectronAppWindowsBehavior")
        return mainWindow;
    }
    argsToUrl(argv:string[]):string{
        let stormChessUrl = argv.slice(-1)+"";
        if(!stormChessUrl.includes(".")) 
            throw Error("argv url does not contain .");
        if(stormChessUrl.length < Protocol.StormChess.name.length+10)
            throw Error("argv url is too short");
        let httpsUrl = Protocol.StormChess.replaceProtocolInUrl(stormChessUrl, Protocol.Https);
        if(stormChessUrl == httpsUrl)
            throw Error("wrong url: protocols matched after conversion.");
        return httpsUrl;
    }
    loadUrl(url:string, mainWindow: BrowserWindow|null) {
        console.log(url)
        if (mainWindow && mainWindow.webContents) {
            mainWindow.webContents.executeJavaScript(`console.log("${url}")`)
            mainWindow.loadURL(url);
        }
    }
}