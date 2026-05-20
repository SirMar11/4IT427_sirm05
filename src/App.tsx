import { useState } from 'react';
import FilmCard, { type Film } from './components/FilmCard';

const movies: Film[] = [
  { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, watched: true },
  { id: 2, title: 'The Matrix', year: 1999, genre: 'Action', rating: 10, watched: false },
  { id: 3, title: 'Spirited Away', year: 2001, genre: 'Animation', rating: 8, watched: true },
];

function App() {
  const [films, setFilms] = useState<Film[]>(movies);

  const handleToggleWatched = (title: string) => {
    setFilms((prevFilms) =>
      prevFilms.map((film) => (film.title === title ? { ...film, watched: !film.watched } : film))
    );
  };

  return (
    <div className="App">
      <h1>Film Watchlist</h1>

      {films.map((film) => (
        <FilmCard key={film.id} film={film} onToggleWatched={handleToggleWatched} />
      ))}
    </div>
  );
}

export default App;
