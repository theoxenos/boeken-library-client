import {createContext} from "react";
import type {TUserContextType} from "../types";

const UserContext = createContext<TUserContextType | null>(null);

export default UserContext;