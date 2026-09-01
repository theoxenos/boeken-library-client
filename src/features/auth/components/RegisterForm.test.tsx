import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist/cjs/index.js";
import {registerFormRoute} from "./RegisterForm.tsx";
import {createStub} from "../../../test-utils/createStub.ts";
import {vi} from "vitest";
import useNotification from "../../notification/hooks/useNotification.tsx";

const mockNotificationContext = {message: '', variant: '', setNotification: vi.fn()};

vi.mock('../../notification/hooks/useNotification.tsx');

describe('form validation with invalid data', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(useNotification).mockReturnValue(mockNotificationContext);
    });

    it('should show error when no name is provided', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: 'Register'});
        const user = userEvent.setup();

        nameInput.value = '';
        await user.click(submitButton);

        expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('should show error when no email is provided', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const emailInput = screen.getByLabelText('E-mail') as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: 'Register'});
        const user = userEvent.setup();

        emailInput.value = '';
        await user.click(submitButton);

        expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('should validate email with wrong email', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const emailInput = screen.getByLabelText('E-mail');
        const submitButton = screen.getByRole('button', {name: 'Register'});
        const user = userEvent.setup();

        await user.type(emailInput, 'test@example');
        await user.click(submitButton);

        expect(screen.getByText('Email must be valid')).toBeInTheDocument();
    });

    it('should show error when no password is provided', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: 'Register'});
        const user = userEvent.setup();

        passwordInput.value = '';
        await user.click(submitButton);

        expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    it('should validate password with wrong password', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', {name: 'Register'});
        const user = userEvent.setup();

        await user.type(passwordInput, 'pass');
        await user.click(submitButton);

        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });

    it('should show error when confirm password is not provided', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: 'Register'});
        const user = userEvent.setup();

        await user.type(passwordInput, 'password123');
        confirmPasswordInput.value = '';
        await user.click(submitButton);

        expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
    });

    it('should show an error if password does not match with confirm password', async () => {
        const Stub = createStub({component: registerFormRoute.Component, action: registerFormRoute.action});
        render(<Stub/>);
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('E-mail');
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
        const submitButton = screen.getByRole('button', {name: 'Register'});

        const user = userEvent.setup();
        await user.type(nameInput, 'John Doe');
        await user.type(emailInput, 'john.doe@example.com');
        await user.type(passwordInput, 'password');
        await user.type(confirmPasswordInput, 'wrongpassword');
        await user.click(submitButton);

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
});

describe('form validation with valid data', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(useNotification).mockReturnValue(mockNotificationContext);
    });

    it('should show no errors with valid data', async () => {
        // Arrange
        const Stub = createStub({
            component: registerFormRoute.Component,
            action: registerFormRoute.action
        });
        render(<Stub/>);
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('E-mail');
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
        const submitButton = screen.getByRole('button', {name: 'Register'});

        // Act
        const user = userEvent.setup();
        await user.type(nameInput, 'John Doe');
        await user.type(emailInput, 'john.doe@example.com');
        await user.type(passwordInput, 'password');
        await user.type(confirmPasswordInput, 'password');
        await user.click(submitButton);

        // Assert
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Email must be valid')).not.toBeInTheDocument();
        expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
        expect(screen.queryByText('Please confirm your password')).not.toBeInTheDocument();
        expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
        expect(nameInput.classList.contains('is-invalid')).toBe(false);
        expect(emailInput.classList.contains('is-invalid')).toBe(false);
        expect(passwordInput.classList.contains('is-invalid')).toBe(false);
        expect(confirmPasswordInput.classList.contains('is-invalid')).toBe(false);
    });
});

describe('correct element types for password fields', () => {
    it('should have password type input for password', () => {
        const Stub = createStub({component: registerFormRoute.Component});
        render(<Stub/>);
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should have password type input for confirm password', () => {
        const Stub = createStub({component: registerFormRoute.Component});
        render(<Stub/>);
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });
});
