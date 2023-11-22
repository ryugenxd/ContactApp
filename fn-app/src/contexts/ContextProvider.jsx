import {createContext,useState,useContext} from "react";


const StateContext = createContext({
    user:null,
    token:null,
    setUser:()=>{},
    setToken:()=>{},
});

export const ContextProvider = ({children})=>{
    const [token,_setToken] = useState(localStorage.getItem('TOKEN') || '');
    const [user,setUser] = useState(null);

    const setToken = (token)=>{
        if(token){
            localStorage.setItem('TOKEN',token);
        }else{
            localStorage.removeItem('TOKEN')
        }
        _setToken(token);
    }

    return (<StateContext.Provider
    value={{
        token,
        user,
        setUser,
        setToken
    }}>
        {children}
    </StateContext.Provider>);
}


// fnc state context 
export const useStateContext = () => useContext(StateContext);
