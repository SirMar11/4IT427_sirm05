import { useWatchlist } from '../context/WatchlistContext';
import FilmCard from '../components/FilmCard';

export default function WatchlistPage() {
  const { films, toggleWatched, removeFilm, markAllAsWatched, isLoading, isError, refetch } =
    useWatchlist();

  if (isLoading) {
    return <p style={{ color: 'var(--color-muted)', padding: '2rem 0' }}>Načítám…</p>;
  }

  if (isError) {
    return (
      <div className="empty-state">
        <strong>Chyba při načítání</strong>
        <p>Filmy se nepodařilo načíst ze serveru.</p>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={refetch}
          style={{ marginTop: '1rem' }}
        >
          Zkusit znovu
        </button>
      </div>
    );
  }

  return (
    <>
      {/* toolbar */}
      <div className="toolbar">
        <span className="section-label" style={{ margin: 0 }}>
          Moje filmy
        </span>
        <button className="btn btn-ghost" type="button" onClick={markAllAsWatched}>
          Označit vše jako zhlédnuté
        </button>
      </div>

      {/* Film list - empty vs populated */}
      {films.length === 0 ? (
        <div className="empty-state">
          <strong>Žádné filmy</strong>
          <p>Přidej svůj první film na stránce - Přidat film.</p>
        </div>
      ) : (
        <div className="film-grid">
          {films.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              onToggleWatched={toggleWatched}
              onRemove={removeFilm}
            />
          ))}
        </div>
      )}
    </>
  );
}
