import { BrowserWindow } from "electron";
import { injectable } from "inversify";
import { dirname } from "path";
import { IBrowserWindowEnvironmentFactory } from "./IBrowserWindowEnvironmentFactory";
const appDir = dirname(require.main?.filename as string);

@injectable()
export class BrowserWindowProductionFactory implements IBrowserWindowEnvironmentFactory{
    create(): BrowserWindow{
        return new BrowserWindow({
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
    }
}