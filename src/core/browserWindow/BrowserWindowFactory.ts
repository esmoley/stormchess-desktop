import { BrowserWindow } from "electron";
import { injectable } from "inversify";
import { container } from "../../inversify.config";
import { TYPES } from "../inversify.types";
import { IBrowserWindowEnvironmentFactory } from "./environment/IBrowserWindowEnvironmentFactory";

export class BrowserWindowFactory{
    browserWindowEnvironmentFactory : IBrowserWindowEnvironmentFactory = container.get<IBrowserWindowEnvironmentFactory>(TYPES.IBrowserWindowEnvironmentFactory);
    create():BrowserWindow{
        let result = this.browserWindowEnvironmentFactory.create();
        return result;
    }
}