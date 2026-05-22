import type { Film } from '../types/film.types';

interface FilmCardProps {
  film: Film;
  onToggleWatched: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function FilmCard({ film, onToggleWatched, onRemove }: FilmCardProps) {
  const { title, year, genre, rating, watched } = film;
  const isRatingValid = rating >= 1 && rating <= 10;

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>
        {year} · {genre}
      </p>
      <p>{isRatingValid ? `Rating: ${rating}/10` : 'Neplatné hodnocení'}</p>
      <p>{watched ? 'Zhlédnuto' : 'Nezhlédnuto'}</p>
      <button type="button" onClick={() => onToggleWatched(film.id)}>
        Změnit stav zhlédnutí
      </button>
      <button type="button" onClick={() => onRemove(film.id)}>
        Odebrat
      </button>
    </div>
  );
}
