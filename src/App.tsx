import FilmCard from './components/FilmCard';
import { useWatchlist } from './context/WatchlistContext';
import AddFilmForm from './components/AddFilmForm';

function App() {
  const { films, toggleWatched, markAllAsWatched, removeFilm } = useWatchlist();

  const watchedCount = films.filter((f) => f.watched).length;
  document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`;

  return (
    <div className="App">
      <h1>Film Watchlist</h1>
      <p>
        {watchedCount} / {films.length} zhlédnuto
      </p>
      <button type="button" onClick={markAllAsWatched}>
        Označit vše jako zhlédnuté
      </button>
      <AddFilmForm />
      {films.map((film) => (
        <FilmCard key={film.id} film={film} onToggleWatched={toggleWatched} onRemove={removeFilm} />
      ))}
    </div>
  );
}

export default App;
