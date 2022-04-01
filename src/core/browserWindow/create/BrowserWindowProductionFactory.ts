import { BrowserWindow } from "electron";
import { injectable } from "inversify";
import { dirname } from "path";
import { IBrowserWindowFactory } from "./IBrowserWindowFactory";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class BrowserWindowProductionFactory implements IBrowserWindowFactory{
    create(): BrowserWindow{
        let result = new BrowserWindow({
            //width:900, height: 600
            webPreferences:{
                preload: appDir + "\\renderer\\preload.js",
                nodeIntegration: true
            },
            icon: appDir + "/assets/chess.png",
            show: false,
            title: "Storm chess loading...",
            autoHideMenuBar: true,
        })
        return result;
    }
}