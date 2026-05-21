import FilmCard, { type Film } from './components/FilmCard';
import { useWatchlist } from './hooks/useWatchlist';

const initialMovies: Film[] = [
  { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, watched: false },
  { id: 2, title: 'The Matrix', year: 1999, genre: 'Action', rating: 10, watched: false },
  { id: 3, title: 'Spirited Away', year: 2001, genre: 'Animation', rating: 8, watched: false },
  { id: 4, title: 'The Matrix', year: 1809, genre: 'comedy', rating: 2, watched: false },
];

function App() {
  const { films, toggleWatched, markAllAsWatched } = useWatchlist(initialMovies);

  return (
    <div className="App">
      <h1>Film Watchlist</h1>
      <button type="button" onClick={markAllAsWatched}>
        Označit vše jako zhlédnuté
      </button>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} onToggleWatched={toggleWatched} />
      ))}
    </div>
  );
}

export default App;
