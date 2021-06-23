import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Test render whole app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Lesempolem/i);
  expect(linkElement).toBeInTheDocument();
});
