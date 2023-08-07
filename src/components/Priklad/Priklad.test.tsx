import { render, screen, fireEvent } from '@testing-library/react';
import {Priklad} from './Priklad';

describe('render priklad component:', () => {
    test('component test:', () => {
        render(<Priklad />);
      const title = screen.getByTestId('priklad-title');
      expect(title).toBeInTheDocument();
      expect(title.innerHTML).toBe('TEST');
    })

    test('counter click and increase:', () => {
       render(<Priklad />);
        fireEvent.click(screen.getByText('+'));
        const outputCount = screen.getByTestId('count').innerHTML;
        expect(outputCount).toBe("1");
    })
})