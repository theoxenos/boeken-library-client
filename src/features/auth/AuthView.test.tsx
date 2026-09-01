import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';
import {authViewPageRoute} from './AuthView.tsx'; // Adjust path as needed
import useAuthForm from './hooks/useAuthForm.tsx';

// 1. Mock the custom hook
vi.mock('./hooks/useAuthForm.tsx');

describe('AuthView Component', () => {
    it('renders the login link when the auth form state is "register"', () => {
        // 2. Set the mock return value
        vi.mocked(useAuthForm).mockReturnValue('register');

        // 3. Render inside MemoryRouter
        render(
            <MemoryRouter>
                <authViewPageRoute.Component/>
            </MemoryRouter>
        );

        // 4. Assert the correct link appears
        const link = screen.getByRole('link', {name: /click here to login/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/login');
    });

    it('renders the register link when the auth form state is "login"', () => {
        vi.mocked(useAuthForm).mockReturnValue('login');

        render(
            <MemoryRouter>
                <authViewPageRoute.Component/>
            </MemoryRouter>
        );

        const link = screen.getByRole('link', {name: /click here to register/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/register');
    });
});