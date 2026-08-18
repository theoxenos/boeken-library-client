import {useMatches} from "react-router-dom";

interface AuthHandle {
    authForm: 'login' | 'register';
}

const useAuthForm = (): AuthHandle['authForm'] | undefined => {
    const matches = useMatches();
    return (matches[matches.length - 1]?.handle as AuthHandle | undefined)?.authForm;
};

export default useAuthForm;