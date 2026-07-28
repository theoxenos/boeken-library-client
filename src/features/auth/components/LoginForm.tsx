import {useState, type SubmitEvent} from "react";
import type {TUserLogin} from "../types";

type LoginFormProps = {
    onLogin: (loginData: TUserLogin) => void;
};

const LoginForm = ({onLogin}: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onLogin({email, password});
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email"
                       id="email"
                       name="email"
                       className="form-control"
                       placeholder=""
                       value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       className="form-control"
                       placeholder=""
                       value={password}
                       onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
        </form>
    );
};

export default LoginForm;