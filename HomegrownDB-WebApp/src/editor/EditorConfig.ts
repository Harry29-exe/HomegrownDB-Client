import {WindowConfig, WindowConsts} from "./windows/WindowConfig";

export class EditorConfig {
    queriesWindow  = new WindowConfig(200, WindowConsts.FULL);
    resultsWindow  = new WindowConfig(WindowConsts.FULL, 300);
    dbSchemaWindow = new WindowConfig(150, WindowConsts.FULL);
}

