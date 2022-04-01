import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./core/inversify.types";
import { BrowserWindowDevelopmentFactory } from "./core/browserWindow/create/BrowserWindowDevelopmentFactory";
import { InitializeElectronAppWindowsBehavior } from "./core/electronApp/initialize/InitializeElectronAppWindowsBehavior";
import { IInitializeElectronAppBehavior } from "./core/electronApp/initialize/IInitializeElectronAppBehavior";
import { InitializeElectronAppDefaultBehavior } from "./core/electronApp/initialize/InitializeElectronAppDefaultBehavior";
import { IBrowserWindowFactory } from "./core/browserWindow/create/IBrowserWindowFactory";
import { BrowserWindowProductionFactory } from "./core/browserWindow/create/BrowserWindowProductionFactory";

const fs = require('fs');
const appsettings = JSON.parse(fs.readFileSync(__dirname + '\\appsettings.generated.json')) as {
    environment:string
};
var isWin = process.platform === "win32";
var isMac = process.platform === "darwin";
var isLinux = process.platform === "linux";

const container = new Container({ autoBindInjectable: true });

if(appsettings.environment == "development"){
    container.bind<IBrowserWindowFactory>(TYPES.IBrowserWindowFactory).to(BrowserWindowDevelopmentFactory).inSingletonScope();
}else{
    container.bind<IBrowserWindowFactory>(TYPES.IBrowserWindowFactory).to(BrowserWindowProductionFactory).inSingletonScope();
}

if(isWin){
    container.bind<IInitializeElectronAppBehavior>(TYPES.IInitializeElectronAppBehavior).to(InitializeElectronAppWindowsBehavior).inSingletonScope();
}else{
    container.bind<IInitializeElectronAppBehavior>(TYPES.IInitializeElectronAppBehavior).to(InitializeElectronAppDefaultBehavior).inSingletonScope();
}


export { container };