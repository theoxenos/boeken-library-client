import {Form, type LoaderFunctionArgs, Navigate, useActionData, useLocation} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import authService from "../services/authService.ts";
import useUserContext from "../hooks/useUserContext.tsx";

const LoginForm = () => {
    const {state: locationState} = useLocation();
    const actionData = useActionData();
    const userContext = useUserContext();

    if (actionData?.user) {
        userContext.setUser(actionData.user);
        return <Navigate to={actionData.redirectPath}/>;
    }

    return (
        <Form method="post">
            <input type="hidden" name="redirect" value={locationState?.from?.pathname ?? '/'}/>
            <FormGroup className="mb-3" controlId="email">
                <FormLabel>E-mail</FormLabel>
                <FormControl type="email"
                             name="email"
                             required/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl type="password"
                             name="password"
                             required/>
            </FormGroup>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
    );
};

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const {email, password, redirect: redirectPath} = Object.fromEntries(formData);

    const res = await authService.login({email: email.toString(), password: password.toString()});

    if (res.error) {
        return {error: true}
    }

    return {user: res, redirectPath};
};

export const loginFormRoute = {
    Component: LoginForm,
    action,
    handle: {authForm: 'login'}
};