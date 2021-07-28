import React, {isValidElement} from 'react';
import {render} from '@testing-library/react';
import {GenderIcon} from './GenderIcon';

test('Render for female', () => {
    render(<GenderIcon gender={'f'}/>);
});

test('Render for male', () => {
    const icon = render(<GenderIcon gender={'m'}/>).getByTestId('gender-icon');
    isValidElement(icon)
});
