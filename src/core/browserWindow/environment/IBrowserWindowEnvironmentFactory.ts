import { BrowserWindow } from "electron";

export interface IBrowserWindowEnvironmentFactory{
    create:()=>BrowserWindow;
}