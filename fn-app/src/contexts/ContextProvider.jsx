import {createContext,useState,useContext} from "react";


const StateContext = createContext({
    user:null,
    token:null,
    contacs:[],
    setContacs:()=>{},
    setUser:()=>{},
    setToken:()=>{},
});

const tmp_contact = [];


export const ContextProvider = ({children})=>{
    const [token,_setToken] = useState(localStorage.getItem('TOKEN') || '');
    const [user,_setUser] = useState(JSON.parse(localStorage.getItem('USER')) || null);
    const [contacs,setContacs] = useState(tmp_contact);

    const setToken = (token)=>{
        if(token){
            localStorage.setItem('TOKEN',token);
        }else{
            localStorage.removeItem('TOKEN')
        }
        _setToken(token);
    }

    const setUser = (user)=>{
        if(user){
            localStorage.setItem('USER',JSON.stringify(user));
        }else{
            localStorage.removeItem('USER')
        }
        _setUser(user);
    }

    return (<StateContext.Provider
    value={{
        token,
        user,
        contacs,
        setUser,
        setToken,
        setContacs
    }}>
        {children}
    </StateContext.Provider>);
}


// fnc state context 
export const useStateContext = () => useContext(StateContext);
