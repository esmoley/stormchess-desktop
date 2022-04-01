import { BrowserWindow } from "electron";
import { injectable } from "inversify";
import { IBrowserWindowFactory } from "./IBrowserWindowFactory";
import { dirname } from "path";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class BrowserWindowDevelopmentFactory implements IBrowserWindowFactory{
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