import {Form, type LoaderFunctionArgs, Navigate, useActionData, useLocation} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import authService from "../services/authService.ts";
import useUserContext from "../hooks/useUserContext.tsx";
import useNotification from "../../notification/hooks/useNotification.tsx";
import {useEffect} from "react";

const LoginForm = () => {
    const {state: locationState} = useLocation();
    const actionData = useActionData();
    const userContext = useUserContext();
    const {setNotification} = useNotification();

    useEffect(() => {
        if (actionData?.apiError) {
            setNotification(actionData.apiError, 'danger');
        }
    }, [actionData]);

    if (actionData?.user) {
        userContext.setUser(actionData.user);
        return <Navigate to={actionData.redirectPath}/>;
    }

    return (
        <Form method="post">
            <input type="hidden" name="redirect" value={locationState?.from?.pathname ?? '/'}/>
            <FormGroup className="mb-3" controlId="email">
                <FormLabel>E-mail</FormLabel>
                <FormControl type="text" name="email" isInvalid={!!actionData?.formErrors?.email}/>
                <FormControl.Feedback type="invalid">{actionData?.formErrors?.email}</FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" isInvalid={!!actionData?.formErrors?.password}/>
                <FormControl.Feedback type="invalid">{actionData?.formErrors?.password}</FormControl.Feedback>
            </FormGroup>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
    );
};

type TFormErrors = {
    email?: string;
    password?: string;
}

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const {email, password, redirect: redirectPath} = Object.fromEntries(formData);

    const formErrors = {} as TFormErrors;
    if (!email) {
        formErrors.email = 'Email is required';
    } else if (!email.toString().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        formErrors.email = 'Email must be valid';
    }
    if (password.toString().length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(formErrors).length > 0) {
        return {formErrors};
    }

    const res = await authService.login({email: email.toString(), password: password.toString()});

    if (res.error) {
        return {apiError: res.error}
    }

    return {user: res, redirectPath};
};

export const loginFormRoute = {
    Component: LoginForm,
    action,
    handle: {authForm: 'login'}
};