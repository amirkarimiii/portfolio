// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { LoginDialog } from './LoginDialog';
import { useLoginDialog } from '@/features/admin/stores/loginDialogStore';
import { useAdminLogin } from '@/features/admin/hooks/useAdminAuth';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
    },
}));

vi.mock('@/features/admin/hooks/useAdminAuth', () => ({
    useAdminLogin: vi.fn(),
}));

describe('LoginDialog', () => {
    const mockLogin = vi.fn();
    const mockReset = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useLoginDialog.setState({ open: true });

        vi.mocked(useAdminLogin).mockReturnValue({
            mutate: mockLogin,
            isPending: false,
            error: null,
            reset: mockReset,
        } as never);
    });

    it('should render dialog title, password label and login button when open', () => {
        render(<LoginDialog />);

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
    });

    it('should toggle password visibility when clicking eye button', () => {
        render(<LoginDialog />);

        const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
        const toggleButton = screen.getByRole('button', { name: '' });

        expect(passwordInput.type).toBe('password');

        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe('text');

        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe('password');
    });

    it('should trigger login mutation when form is submitted with valid data', async () => {
        render(<LoginDialog />);

        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /^login$/i });

        fireEvent.change(passwordInput, { target: { value: 'valid_password_123' } });
        fireEvent.submit(submitButton.closest('form')!);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('valid_password_123', expect.any(Object));
        });
    });

    it('should show "Authenticating..." and disable button when request is pending', () => {
        vi.mocked(useAdminLogin).mockReturnValue({
            mutate: mockLogin,
            isPending: true,
            error: null,
            reset: mockReset,
        } as never);

        render(<LoginDialog />);

        const submitButton = screen.getByRole('button', { name: /authenticating\.\.\./i });
        expect(submitButton).toBeDisabled();
    });

    it('should show server error message if serverError exists', () => {
        vi.mocked(useAdminLogin).mockReturnValue({
            mutate: mockLogin,
            isPending: false,
            error: new Error('Invalid credentials'),
            reset: mockReset,
        } as never);

        render(<LoginDialog />);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('should clear errors and reset state when user changes password input', () => {
        vi.mocked(useAdminLogin).mockReturnValue({
            mutate: mockLogin,
            isPending: false,
            error: new Error('Server error'),
            reset: mockReset,
        } as never);

        render(<LoginDialog />);

        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(passwordInput, { target: { value: 'new_pass' } });

        expect(mockReset).toHaveBeenCalled();
    });

    it('should trigger toast.success and close dialog on login success callback', () => {
        render(<LoginDialog />);

        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /^login$/i });

        fireEvent.change(passwordInput, { target: { value: 'valid_password' } });
        fireEvent.submit(submitButton.closest('form')!);

        const options = mockLogin.mock.calls[0][1];
        options.onSuccess();

        expect(toast.success).toHaveBeenCalledWith('LOGIN_SUCCESS');
        expect(useLoginDialog.getState().open).toBe(false);
    });
});