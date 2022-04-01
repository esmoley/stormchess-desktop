import { BrowserWindow } from "electron";
import { injectable } from "inversify";
import { IBrowserWindowEnvironmentFactory } from "./IBrowserWindowEnvironmentFactory";
import { dirname } from "path";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class BrowserWindowDevelopmentFactory implements IBrowserWindowEnvironmentFactory{
    create(): BrowserWindow{
        let result = new BrowserWindow({
            width:900, height: 600,
            webPreferences:{
                preload: appDir + "\\renderer\\preload.js",
                nodeIntegration: true
            },
            icon: appDir + "/assets/chess.png",
            show: false,
            title: "[development mode] Storm chess loading...",
            //autoHideMenuBar: true,
        });
        result.webContents.openDevTools();
        return result;
    }
}