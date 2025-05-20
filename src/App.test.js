import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders results after successful search', async () => {
    axios.post.mockResolvedValueOnce({
      data: [
        {
          title: 'Example Result',
          url: 'https://example.com',
          snippet: 'Snippet',
          source: 'example.com'
        }
      ]
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/enter your search query/i);
    fireEvent.change(input, { target: { value: 'react' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText('Example Result')).toBeInTheDocument();
  });

  test('shows error message on failed search', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    const input = screen.getByPlaceholderText(/enter your search query/i);
    fireEvent.change(input, { target: { value: 'react' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/error performing search/i)).toBeInTheDocument();
  });
});
