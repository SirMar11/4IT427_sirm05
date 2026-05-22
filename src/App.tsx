import FilmCard from './components/FilmCard';
import AddFilmForm from './components/AddFilmForm';
import { useWatchlist } from './context/WatchlistContext';

function App() {
  const { films, toggleWatched, removeFilm, markAllAsWatched } = useWatchlist();

  const watchedCount = films.filter((f) => f.watched).length;
  document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`;

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-logo">
          Watch<span>list</span>
        </h1>
        <span className="app-stats">
          <strong>{watchedCount}</strong> / {films.length} zhlédnuto
        </span>
      </header>

      <div className="section-label">Přidat film</div>
      <AddFilmForm />

      <hr className="divider" />

      <div className="toolbar">
        <span className="section-label" style={{ margin: 0 }}>Moje filmy</span>
        <button className="btn btn-ghost" type="button" onClick={markAllAsWatched}>
          Označit vše jako zhlédnuté
        </button>
      </div>

      {films.length === 0 ? (
        <div className="empty-state">
          <strong>Žádné filmy</strong>
          <p>Přidej svůj první film pomocí formuláře výše.</p>
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
    </div>
  );
}

export default App;
