import { Link } from '../types/link';

const API_URL = 'http://localhost:8080';

export const shortenURL = async (longUrl: string): Promise<Link> => {
  const response = await fetch(`${API_URL}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: longUrl }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao encurtar a URL');
  }

  return response.json();
};