import {render, screen, fireEvent} from '@testing-library/react';
import {TextFormField} from './TextFormField';

describe('TextFormField', () => {
    const defaultProps = {
        id: 'test-field',
        type: 'text' as const,
        value: '',
        label: 'Test Label',
        placeholder: 'Enter value',
        fieldError: false,
        enabled: true,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders label correctly', () => {
        render(<TextFormField {...defaultProps}/>);
        expect(screen.getByText('Test Label:')).toBeInTheDocument();
    });

    test('renders with placeholder', () => {
        render(<TextFormField {...defaultProps}/>);
        expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
    });

    test('calls onChange when value changes', () => {
        render(<TextFormField {...defaultProps}/>);
        const input = screen.getByPlaceholderText('Enter value');
        fireEvent.change(input, {target: {value: 'new value'}});
        expect(defaultProps.onChange).toHaveBeenCalledWith('new value');
    });

    test('is disabled when enabled is false', () => {
        render(<TextFormField {...defaultProps} enabled={false}/>);
        const input = screen.getByPlaceholderText('Enter value');
        expect(input).toBeDisabled();
    });

    test('shows error state when fieldError is true', () => {
        render(<TextFormField {...defaultProps} fieldError={true}/>);
        const input = screen.getByPlaceholderText('Enter value');
        expect(input).toHaveClass('is-invalid');
    });

    test('shows error description when provided', () => {
        render(
            <TextFormField
                {...defaultProps}
                fieldError={true}
                fieldErrorDescription="This field is required"
            />
        );
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    test('renders with email type', () => {
        render(<TextFormField {...defaultProps} type="email"/>);
        const input = screen.getByPlaceholderText('Enter value');
        expect(input).toHaveAttribute('type', 'email');
    });

    test('renders with date type', () => {
        const {container} = render(<TextFormField {...defaultProps} type="date"/>);
        const input = container.querySelector('input[type="date"]');
        expect(input).toHaveAttribute('type', 'date');
    });

    test('displays current value', () => {
        render(<TextFormField {...defaultProps} value="current value"/>);
        const input = screen.getByPlaceholderText('Enter value');
        expect(input).toHaveValue('current value');
    });
});
