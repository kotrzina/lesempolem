import {render, screen} from '@testing-library/react';
import {LpDate} from './LpDate';

describe('LpDate', () => {
    describe('short format', () => {
        test('renders competition date in short format', () => {
            render(<LpDate type="lp" format="short"/>);
            expect(screen.getByText(/16/)).toBeInTheDocument();
            expect(screen.getByText(/5/)).toBeInTheDocument();
            expect(screen.getByText(/2026/)).toBeInTheDocument();
        });

        test('renders registration deadline in short format', () => {
            render(<LpDate type="registrationTo" format="short"/>);
            expect(screen.getByText(/15/)).toBeInTheDocument();
            expect(screen.getByText(/2026/)).toBeInTheDocument();
        });
    });

    describe('long format', () => {
        test('renders competition date in long format with month name', () => {
            render(<LpDate type="lp" format="long"/>);
            expect(screen.getByText(/16/)).toBeInTheDocument();
            expect(screen.getByText(/května/)).toBeInTheDocument();
            expect(screen.getByText(/2026/)).toBeInTheDocument();
        });

        test('renders registration deadline in long format', () => {
            render(<LpDate type="registrationTo" format="long"/>);
            expect(screen.getByText(/15/)).toBeInTheDocument();
            expect(screen.getByText(/května/)).toBeInTheDocument();
        });
    });
});
