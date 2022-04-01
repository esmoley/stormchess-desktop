import { App, BrowserWindow } from "electron";

export interface IInitializeElectronAppBehavior{
    onMainWindowCreatedRegisterEvent(callback: (mainWindow: BrowserWindow) => any): void;
    execute(app:App):void;
}