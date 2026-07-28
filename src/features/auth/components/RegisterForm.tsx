import {useState, type SubmitEvent} from "react";
import type {TUserRegistration} from "../types";

type TRegisterFormProps = {
    onRegister: (user: TUserRegistration) => void;
}

const RegisterForm = ({onRegister}: TRegisterFormProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRegister({
            name,
            email,
            password
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text"
                       id="name"
                       name="name"
                       className="form-control"
                       placeholder="Name"
                       value={name}
                       onChange={e => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="text"
                       id="email"
                       name="email"
                       className="form-control"
                       placeholder="E-mail"
                       value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       className="form-control"
                       placeholder="Password"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                <input type="password"
                       id="passwordConfirm"
                       name="passwordConfirm"
                       className="form-control"
                       placeholder="Repeat password"
                       pattern={password}
                       title="Passwords do not match"
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-success" type="submit">Register</button>
            </div>
        </form>
    );
};

export default RegisterForm;