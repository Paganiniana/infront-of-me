import { createContext } from "react";
import { LocalUser } from "../firebase/auth";

const AuthContext = createContext<LocalUser>(null);

export default AuthContext;