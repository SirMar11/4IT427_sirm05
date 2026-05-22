import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext.tsx';

export default function AddFilmForm() {
  const { addFilm } = useWatchlist();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addFilm({
      id: Date.now(),
      title,
      year: Number(year),
      genre,
      rating: Number(rating),
      watched: false,
    });

    setTitle('');
    setYear('');
    setGenre('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Název filmu"
        required
      />
      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Rok vydání"
        type="number"
        required
      />
      <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Žánr" required />
      <input
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Hodnocení (1-10)"
        type="number"
        min="1"
        max="10"
        required
      />
      <button type="submit">Přidat film</button>
    </form>
  );
}
