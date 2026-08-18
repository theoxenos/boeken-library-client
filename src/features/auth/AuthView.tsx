import {NavLink, Outlet} from "react-router-dom";
import useAuthForm from "./hooks/useAuthForm.tsx";

const AuthView = () => {
    const authForm = useAuthForm();

    const showLoginForm = authForm === 'login';
    const showRegisterForm = authForm === 'register';

    return (
        <div className="row align-content-center h-100">
            <div className="col-12 col-md-6 offset-md-3">
                <div className="card shadow">
                    <div className="card-body">
                        <Outlet/>
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

export const authViewPageRoute = {
    Component: AuthView,
}