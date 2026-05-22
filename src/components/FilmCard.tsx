import type { Film } from '../types/film.types';

interface FilmCardProps {
  film: Film;
  onToggleWatched: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function FilmCard({ film, onToggleWatched, onRemove }: FilmCardProps) {
  const { id, title, year, genre, rating, watched } = film;
  const isRatingValid = rating >= 1 && rating <= 10;
  const meta = `${year} · ${genre}`;

  return (
    <div className="card">
      <div className="card-header">
        {/*
         * card-header-text musí mít min-width: 0 (nastaveno v CSS),
         * jinak flex položka nikdy neshrinkuje pod velikost obsahu
         * a badge přeteče mimo kartu.
         */}
        <div className="card-header-text">
          {/*
           * title atribut zobrazí plný text jako tooltip při hoveru —
           * uživatel tak uvidí celý název i když je zkrácený elipsou.
           */}
          <h2 className="card-title" title={title}>{title}</h2>
          <p className="card-meta" title={meta}>{meta}</p>
        </div>
        <span className={watched ? 'badge badge-watched' : 'badge badge-unwatched'}>
          {watched ? 'Zhlédnuto' : 'Nové'}
        </span>
      </div>

      <p className="card-rating">
        {isRatingValid ? <><span>★</span> {rating} / 10</> : 'Neplatné hodnocení'}
      </p>

      <div className="card-actions">
        <button className="btn btn-ghost" type="button" onClick={() => onToggleWatched(id)}>
          {watched ? 'Označit jako nové' : 'Označit jako zhlédnuté'}
        </button>
        <button className="btn btn-danger" type="button" onClick={() => onRemove(id)}>
          Odebrat
        </button>
      </div>
    </div>
  );
}
