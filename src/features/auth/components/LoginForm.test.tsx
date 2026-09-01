import {createStub} from "../../../test-utils/createStub.ts";
import {render, screen} from "@testing-library/react";
import {loginFormRoute} from "./LoginForm.tsx";
import type {TUserContextType} from "../types";
import userEvent from "@testing-library/user-event/dist/cjs/index.js";
import useUserContext from "../hooks/useUserContext.tsx";
import useNotification from "../../notification/hooks/useNotification.tsx";
import {vi} from "vitest";

const mockNotificationContext = {message: '', variant: '', setNotification: vi.fn()};
const mockUserContext: TUserContextType = {
    user: null,
    setUser: vi.fn(),
};

vi.mock('../hooks/useUserContext.tsx');
vi.mock('../../notification/hooks/useNotification.tsx');

it('should have password type input for password', () => {
    // Arrange
    vi.mocked(useNotification).mockReturnValue(mockNotificationContext);
    vi.mocked(useUserContext).mockReturnValue(mockUserContext);

    const Stub = createStub({component: loginFormRoute.Component});
    render(<Stub/>);

    // Act
    const passwordInput = screen.getByLabelText('Password');

    // Assert
    expect(passwordInput).toHaveAttribute('type', 'password');
});

describe('form validation with invalid data', () => {
    beforeEach(() => {
        vi.resetAllMocks();

        vi.mocked(useNotification).mockReturnValue(mockNotificationContext);
        vi.mocked(useUserContext).mockReturnValue(mockUserContext);
    });

    it('should show error when no email is provided', async () => {
        // Arrange
        const Stub = createStub({
            component: loginFormRoute.Component,
            action: loginFormRoute.action
        });
        render(<Stub/>);

        const emailInput = screen.getByLabelText('E-mail') as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: 'Login'});
        const user = userEvent.setup();

        // Act
        emailInput.value = '';
        await user.click(submitButton);

        // Assert
        expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('should validate email with wrong email', async () => {
        // Arrange
        const Stub = createStub({
            component: loginFormRoute.Component,
            action: loginFormRoute.action
        });
        render(<Stub/>);

        const emailInput = screen.getByLabelText('E-mail');
        const submitButton = screen.getByRole('button', {name: 'Login'});
        const user = userEvent.setup();

        // Act
        await user.type(emailInput, 'test@example');
        await user.click(submitButton);

        // Assert
        expect(screen.getByText('Email must be valid')).toBeInTheDocument();
    });

    it('should show error when no password is provided', async () => {
        // Arrange
        const Stub = createStub({
            component: loginFormRoute.Component,
            action: loginFormRoute.action
        });
        render(<Stub/>);

        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: 'Login'});
        const user = userEvent.setup();

        // Act
        passwordInput.value = '';
        await user.click(submitButton);

        // Assert
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });

    it('should validate password with wrong password', async () => {
        // Arrange
        const Stub = createStub({
            component: loginFormRoute.Component,
            action: loginFormRoute.action
        });
        render(<Stub/>);

        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', {name: 'Login'});
        const user = userEvent.setup();

        // Act
        await user.type(passwordInput, 'pass');
        await user.click(submitButton);

        // Assert
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
});

describe('form validation with valid data', () => {
    beforeEach(() => {
        vi.mocked(useNotification).mockReturnValue(mockNotificationContext);
        vi.mocked(useUserContext).mockReturnValue(mockUserContext);
    });

    it('should not show an error with a valid email', async () => {
        // Arrange
        const Stub = createStub({
            component: loginFormRoute.Component,
            action: loginFormRoute.action
        });
        render(<Stub/>);

        const emailInput = screen.getByLabelText('E-mail');
        const submitButton = screen.getByRole('button', {name: 'Login'});
        const user = userEvent.setup();

        // Act
        await user.type(emailInput, 'test@example.com');
        await user.click(submitButton);

        // Assert
        expect(screen.queryByText('Email must be valid')).not.toBeInTheDocument();
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
        expect(emailInput.classList.contains('is-invalid')).toBe(false);
    });

    it('should not show an error with a valid password', async () => {
        // Arrange
        const Stub = createStub({
            component: loginFormRoute.Component,
            action: loginFormRoute.action
        });
        render(<Stub/>);

        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', {name: 'Login'});
        const user = userEvent.setup();

        // Act
        await user.type(passwordInput, 'correctpassword');
        await user.click(submitButton);

        // Assert
        expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
        expect(passwordInput.classList.contains('is-invalid')).toBe(false);
    });
});