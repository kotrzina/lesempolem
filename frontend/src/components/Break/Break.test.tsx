import {render} from '@testing-library/react';
import {Break} from './Break';

describe('Break', () => {
    test('renders with correct padding', () => {
        const {container} = render(<Break size={10}/>);
        const div = container.firstChild as HTMLElement;
        expect(div.style.paddingBottom).toBe('10px');
    });

    test('renders with different size', () => {
        const {container} = render(<Break size={50}/>);
        const div = container.firstChild as HTMLElement;
        expect(div.style.paddingBottom).toBe('50px');
    });

    test('renders with zero size', () => {
        const {container} = render(<Break size={0}/>);
        const div = container.firstChild as HTMLElement;
        expect(div.style.paddingBottom).toBe('0px');
    });
});
