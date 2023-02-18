import { createContext, useState } from "react";

interface HomeContextData {
    status: string;
    setStatus: (status: string) => void;
}

export const HomeContext = createContext({} as HomeContextData);

const HomeProvider = ({ children }: {children: React.ReactNode }) => {
    const [status, setStatus] = useState(sessionStorage.getItem('status') || "disponivel");

    return (
        <HomeContext.Provider value={{status, setStatus}}>
            {children}
        </HomeContext.Provider>
    )
};

export default HomeProvider;
