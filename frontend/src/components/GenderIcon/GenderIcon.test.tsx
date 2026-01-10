import {render, screen} from '@testing-library/react';
import {GenderIcon} from './GenderIcon';

describe('GenderIcon', () => {
    test('renders female icon with correct alt text', () => {
        render(<GenderIcon gender="f"/>);
        const icon = screen.getByTestId('gender-icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('alt', 'f');
    });

    test('renders male icon with correct alt text', () => {
        render(<GenderIcon gender="m"/>);
        const icon = screen.getByTestId('gender-icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('alt', 'm');
    });

    test('renders with unknown gender', () => {
        render(<GenderIcon gender="unknown"/>);
        const icon = screen.getByTestId('gender-icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('alt', 'unknown');
    });

    test('renders with data-testid attribute', () => {
        render(<GenderIcon gender="m"/>);
        expect(screen.getByTestId('gender-icon')).toBeInTheDocument();
    });
});
