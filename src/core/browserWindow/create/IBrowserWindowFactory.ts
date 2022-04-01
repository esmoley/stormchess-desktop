import { BrowserWindow } from "electron";

export interface IBrowserWindowFactory{
    create:()=>BrowserWindow;
}