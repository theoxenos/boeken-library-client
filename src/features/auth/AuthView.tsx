import {NavLink, useLocation, useNavigate} from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import type {TUserLogin, TUserRegistration} from "./types";
import authService from "./services/authService.ts";
import useUserContext from "./hooks/useUserContext.tsx";
import RegisterForm from "./components/RegisterForm.tsx";

const AuthView = () => {
    const {pathname, state: locationState} = useLocation();

    const navigate = useNavigate();

    const redirectPath = locationState?.from || '/';

    const showLoginForm = pathname === '/login';
    const showRegisterForm = pathname === '/register';

    const {setUser} = useUserContext();

    const handleLogin = async (loginData: TUserLogin) => {
        const authResponse = await authService.login(loginData);
        setUser(authResponse?.error ? null : authResponse);
        return navigate(redirectPath);
    };

    const handleRegister = async (registerData: TUserRegistration) => {
        try {
            await authService.register(registerData);
            return navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row align-content-center h-100">
            <div className="col-12 col-md-6 offset-md-3">
                <div className="card shadow">
                    <div className="card-body">
                        {showLoginForm && <LoginForm onLogin={handleLogin}/>}
                        {showRegisterForm && <RegisterForm onRegister={handleRegister}/>}
                    </div>
                    <div className="card-footer d-flex flex-row justify-content-center">
                        <div>
                            {showRegisterForm && (
                                <NavLink to='/login' className="btn btn-link">Click here to login</NavLink>
                            )}
                            {showLoginForm && (
                                <NavLink to='/register' className="btn btn-link">Click here to register</NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthView;