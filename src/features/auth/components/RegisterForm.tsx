import {useState} from "react";
import {Form, type LoaderFunctionArgs} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import authService from "../services/authService.ts";

const RegisterForm = () => {
    const [password, setPassword] = useState('');

    return (
        <Form method="post">
            <FormGroup className="mb-3" controlId="name">
                <FormLabel>Name</FormLabel>
                <FormControl type="text"
                             name="name"
                             placeholder="Name"
                             required/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="email">
                <FormLabel>E-mail</FormLabel>
                <FormControl type="email"
                             name="email"
                             placeholder="E-mail"
                             required/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl type="password"
                             name="password"
                             placeholder="Password"
                             onChange={e => setPassword(e.target.value)}
                             required/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="passwordConfirm">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password"
                             name="passwordConfirm"
                             placeholder="Repeat password"
                             pattern={password}
                             title="Passwords do not match"
                             required/>
            </FormGroup>
            <Button variant="success" type="submit">Register</Button>
        </Form>
    );
};

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const {name, email, password} = Object.fromEntries(formData);

    const res = await authService.register({
        name: name.toString(),
        email: email.toString(),
        password: password.toString()
    });

    if (!res)
        return redirect('/login');
};

export const registerFormRoute = {
    Component: RegisterForm,
    action,
    handle: {authForm: 'register'}
};