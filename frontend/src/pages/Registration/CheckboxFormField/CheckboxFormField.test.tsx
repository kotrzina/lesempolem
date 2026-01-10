import {render, screen, fireEvent} from '@testing-library/react';
import {CheckboxFormField} from './CheckboxFormField';

describe('CheckboxFormField', () => {
    const defaultProps = {
        id: 'test-checkbox',
        label: 'I agree to terms',
        checked: false,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders label correctly', () => {
        render(<CheckboxFormField {...defaultProps}/>);
        expect(screen.getByText('I agree to terms')).toBeInTheDocument();
    });

    test('renders unchecked by default when checked is false', () => {
        render(<CheckboxFormField {...defaultProps}/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    test('renders checked when checked is true', () => {
        render(<CheckboxFormField {...defaultProps} checked={true}/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    test('calls onChange when clicked', () => {
        render(<CheckboxFormField {...defaultProps}/>);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(defaultProps.onChange).toHaveBeenCalledWith(true);
    });

    test('toggles checked state when clicked', () => {
        render(<CheckboxFormField {...defaultProps} checked={true}/>);
        const checkbox = screen.getByRole('checkbox');

        // Initially checked
        expect(checkbox).toBeChecked();

        // Click to uncheck
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(defaultProps.onChange).toHaveBeenCalledWith(false);
    });

    test('renders with React node label', () => {
        const nodeLabel = <span data-testid="custom-label">Custom <strong>Label</strong></span>;
        render(<CheckboxFormField {...defaultProps} label={nodeLabel}/>);
        expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });

    test('shows invalid state when unchecked', () => {
        const {container} = render(<CheckboxFormField {...defaultProps} checked={false}/>);
        const checkbox = container.querySelector('.is-invalid');
        expect(checkbox).toBeInTheDocument();
    });
});
