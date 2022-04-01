import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./core/inversify.types";
import { IBrowserWindowEnvironmentFactory } from "./core/browserWindow/environment/IBrowserWindowEnvironmentFactory";
import { BrowserWindowDevelopmentFactory } from "./core/browserWindow/environment/BrowserWindowDevelopmentFactory";
import { BrowserWindowProductionFactory } from "./core/browserWindow/environment/BrowserWindowProductionFactory";
import { BrowserWindowFactory } from "./core/browserWindow/BrowserWindowFactory";
import { InitializeElectronAppWindowsBehavior } from "./core/electronApp/initialize/InitializeElectronAppWindowsBehavior";
import { IInitializeElectronAppBehavior } from "./core/electronApp/initialize/IInitializeElectronAppBehavior";
import { InitializeElectronAppDefaultBehavior } from "./core/electronApp/initialize/InitializeElectronAppDefaultBehavior";

const fs = require('fs');
const appsettings = JSON.parse(fs.readFileSync(__dirname + '\\appsettings.generated.json')) as {
    environment:string
};
var isWin = process.platform === "win32";
var isMac = process.platform === "darwin";
var isLinux = process.platform === "linux";

const container = new Container({ autoBindInjectable: true });

if(appsettings.environment == "development"){
    container.bind<IBrowserWindowEnvironmentFactory>(TYPES.IBrowserWindowEnvironmentFactory).to(BrowserWindowDevelopmentFactory).inSingletonScope();
}else{
    container.bind<IBrowserWindowEnvironmentFactory>(TYPES.IBrowserWindowEnvironmentFactory).to(BrowserWindowProductionFactory).inSingletonScope();
}

if(isWin){
    container.bind<IInitializeElectronAppBehavior>(TYPES.IInitializeElectronAppBehavior).to(InitializeElectronAppWindowsBehavior).inSingletonScope();
}else{
    container.bind<IInitializeElectronAppBehavior>(TYPES.IInitializeElectronAppBehavior).to(InitializeElectronAppDefaultBehavior).inSingletonScope();
}


export { container };