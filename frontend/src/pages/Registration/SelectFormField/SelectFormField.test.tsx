import {render, screen, fireEvent} from '@testing-library/react';
import {SelectFormField} from './SelectFormField';

describe('SelectFormField', () => {
    const defaultProps = {
        id: 'test-select',
        value: 'm',
        label: 'Gender',
        options: [
            {value: 'm', label: 'Male'},
            {value: 'f', label: 'Female'},
        ],
        enabled: true,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders label correctly', () => {
        render(<SelectFormField {...defaultProps}/>);
        expect(screen.getByText('Gender')).toBeInTheDocument();
    });

    test('renders all options', () => {
        render(<SelectFormField {...defaultProps}/>);
        expect(screen.getByText('Male')).toBeInTheDocument();
        expect(screen.getByText('Female')).toBeInTheDocument();
    });

    test('has correct initial value', () => {
        render(<SelectFormField {...defaultProps}/>);
        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('m');
    });

    test('calls onChange when selection changes', () => {
        render(<SelectFormField {...defaultProps}/>);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, {target: {value: 'f'}});
        expect(defaultProps.onChange).toHaveBeenCalledWith('f');
    });

    test('is disabled when enabled is false', () => {
        render(<SelectFormField {...defaultProps} enabled={false}/>);
        const select = screen.getByRole('combobox');
        expect(select).toBeDisabled();
    });

    test('renders with race options', () => {
        const raceProps = {
            ...defaultProps,
            id: 'race',
            label: 'Race',
            value: '42km',
            options: [
                {value: '84km', label: 'Ultramarathon - 84 km'},
                {value: '42km', label: 'Marathon - 42 km'},
                {value: '14km', label: 'Loop - 14 km'},
            ],
        };
        render(<SelectFormField {...raceProps}/>);
        expect(screen.getByText('Ultramarathon - 84 km')).toBeInTheDocument();
        expect(screen.getByText('Marathon - 42 km')).toBeInTheDocument();
        expect(screen.getByText('Loop - 14 km')).toBeInTheDocument();
    });
});
