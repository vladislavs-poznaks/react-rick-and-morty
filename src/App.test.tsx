import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from './components/pages/character/Index';

test('renders learn react link', () => {
  render(<Index />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
