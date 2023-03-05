import {createContext, ParentComponent, useContext} from "solid-js";
import {QueriesManager, QueriesManagerImpl} from "./QueriesManager";

const queriesContext = createContext<QueriesManager>({} as QueriesManager);

export const useQueriesContext = () => useContext<QueriesManager>(queriesContext)

interface QueriesContextProviderProps {
    queriesManager: QueriesManager
}

export const QueriesContext: ParentComponent<QueriesContextProviderProps> = props => {
    return <queriesContext.Provider value={props.queriesManager}>
        {props.children}
    </queriesContext.Provider>
}
