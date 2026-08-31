import {useEffect, useState} from "react";
import {Form, type LoaderFunctionArgs, redirect, useActionData} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import authService from "../services/authService.ts";
import useNotification from "../../notification/hooks/useNotification.tsx";

type TFormErrors = {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

const RegisterForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const actionData = useActionData() as { formErrors?: TFormErrors; apiError?: string } | undefined;
    const {setNotification} = useNotification();

    useEffect(() => {
        if (!actionData?.apiError) return;

        setNotification(actionData.apiError, 'danger');

    }, [actionData]);

    const isConfirmPasswordValid = !confirmPassword || password === confirmPassword;

    return (
        <Form method="post">
            <FormGroup className="mb-3" controlId="name">
                <FormLabel>Name</FormLabel>
                <FormControl type="text"
                             name="name"
                             placeholder="Name"
                             isInvalid={!!actionData?.formErrors?.name}
                />
                <FormControl.Feedback type="invalid">
                    {actionData?.formErrors?.name}
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3" controlId="email">
                <FormLabel>E-mail</FormLabel>
                <FormControl type="email"
                             name="email"
                             placeholder="E-mail"
                             isInvalid={!!actionData?.formErrors?.email}
                />
                <FormControl.Feedback type="invalid">
                    {actionData?.formErrors?.email}
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl type="password"
                             name="password"
                             placeholder="Password"
                             isInvalid={!!actionData?.formErrors?.password}
                             onChange={e => setPassword(e.target.value)}
                />
                <FormControl.Feedback type="invalid">
                    {actionData?.formErrors?.password}
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3" controlId="passwordConfirm">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password"
                             name="passwordConfirm"
                             placeholder="Repeat password"
                             isInvalid={!isConfirmPasswordValid || !!actionData?.formErrors?.passwordConfirm}
                             onChange={e => setConfirmPassword(e.target.value)}
                />
                <FormControl.Feedback type="invalid">
                    {actionData?.formErrors?.passwordConfirm || 'Passwords do not match'}
                </FormControl.Feedback>
            </FormGroup>
            <Button variant="success" type="submit">Register</Button>
        </Form>
    );
};

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const {name, email, password, passwordConfirm} = Object.fromEntries(formData);

    const formErrors = {} as TFormErrors;

    if (!name || !name.toString().trim()) {
        formErrors.name = 'Name is required';
    }

    if (!email) {
        formErrors.email = 'Email is required';
    } else if (!email.toString().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        formErrors.email = 'Email must be valid';
    }

    if (!password) {
        formErrors.password = 'Password is required';
    } else if (password.toString().length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
    }

    if (!passwordConfirm) {
        formErrors.passwordConfirm = 'Please confirm your password';
    } else if (password.toString() !== passwordConfirm.toString()) {
        formErrors.passwordConfirm = 'Passwords do not match';
    }

    if (Object.keys(formErrors).length > 0) {
        return {formErrors};
    }

    try {
        const res = await authService.register({
            name: name.toString(),
            email: email.toString(),
            password: password.toString()
        });

        if (res?.error) {
            return {apiError: res.error};
        }

        return redirect('/login');
    } catch (error) {
        return {apiError: 'Registration failed. Please try again.'};
    }
};

export const registerFormRoute = {
    Component: RegisterForm,
    action,
    handle: {authForm: 'register'}
};