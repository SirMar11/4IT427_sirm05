import { useState, useEffect } from 'react';
import type { Film } from '../components/FilmCard';

export function useWatchlist(initialFilms: Film[]) {
  const [films, setFilms] = useState<Film[]>(initialFilms);

  useEffect(() => {
    const watchedCount = films.filter((f) => f.watched).length;
    document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`;
  }, [films]);

  const toggleWatched = (id: number) => {
    setFilms((prev) =>
      prev.map((film) => (film.id === id ? { ...film, watched: !film.watched } : film))
    );
  };

  const markAllAsWatched = () => {
    setFilms((prev) => prev.map((film) => ({ ...film, watched: true })));
  };

  return { films, toggleWatched, markAllAsWatched };
}
