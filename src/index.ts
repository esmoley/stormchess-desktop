import "reflect-metadata";
import {app, ipcMain, BrowserWindow, dialog, shell} from "electron";
import { BrowserWindowFactory } from "./core/browserWindow/BrowserWindowFactory";
import { TYPES } from "./core/inversify.types";
import { container } from "./inversify.config";
import { IInitializeElectronAppBehavior } from "./core/electronApp/initialize/IInitializeElectronAppBehavior";
import { Protocol } from "./core/protocol/protocol";
const path = require('path');

let initializeElectronAppBehavior : IInitializeElectronAppBehavior = container.get<IInitializeElectronAppBehavior>(TYPES.IInitializeElectronAppBehavior);
let mainWindow:BrowserWindow;
initializeElectronAppBehavior.onMainWindowCreatedRegisterEvent((window:BrowserWindow)=>{
    mainWindow = window;
    console.log("window created");
})
initializeElectronAppBehavior.execute(app);

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(Protocol.StormChess.name, process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient(Protocol.StormChess.name)
}