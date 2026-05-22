import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext.tsx';

interface AddFilmFormProps {
  onSuccess?: () => void;
}

export default function AddFilmForm({ onSuccess }: AddFilmFormProps) {
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

    onSuccess?.();
  };

  return (
    <div className="form-panel">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label" htmlFor="film-title">
              Název
            </label>
            <input
              id="film-title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Např. Inception"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="film-genre">
              Žánr
            </label>
            <input
              id="film-genre"
              className="input"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Např. Sci-Fi"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="film-year">
              Rok vydání
            </label>
            <input
              id="film-year"
              className="input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Např. 2010"
              type="number"
              min="1888"
              max="2099"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="film-rating">
              Hodnocení
            </label>
            <input
              id="film-rating"
              className="input"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="1 – 10"
              type="number"
              min="1"
              max="10"
              required
            />
          </div>
        </div>

        <button className="btn btn-primary btn-full" type="submit">
          + Přidat film
        </button>
      </form>
    </div>
  );
}
