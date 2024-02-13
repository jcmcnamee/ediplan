import { createContext, useContext } from "react";

const TableContext = createContext();

function TableProvider() {

    

    return <TableContext.Provider value={{

    }}></TableContext.Provider>
}

function useTable () {
    const context = useContext(TableContext);
    return context;
}



export default {TableProvider, useTable}