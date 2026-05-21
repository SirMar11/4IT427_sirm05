export interface Film {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
}

export interface FilmCardProps {
  film: Film;
  onToggleWatched: (id: number) => void;
}

export default function FilmCard({ film, onToggleWatched }: FilmCardProps) {
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
    </div>
  );
}
