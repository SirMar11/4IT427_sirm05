import { createContext, useContext, useState } from 'react';
import type { Film } from '../types/film.types';

interface WatchlistContextValue {
  films: Film[];
  addFilm: (film: Film) => void;
  removeFilm: (id: number) => void;
  toggleWatched: (id: number) => void;
  markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

const initialFilms: Film[] = [
  { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, watched: false },
  { id: 2, title: 'The Matrix', year: 1999, genre: 'Action', rating: 10, watched: false },
  { id: 3, title: 'Spirited Away', year: 2001, genre: 'Animation', rating: 8, watched: false },
];

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [films, setFilms] = useState<Film[]>(initialFilms);

  const addFilm = (film: Film) => {
    setFilms((prev) => [...prev, film]);
  };

  const removeFilm = (id: number) => {
    setFilms((prev) => prev.filter((film) => film.id !== id));
  };

  const toggleWatched = (id: number) => {
    setFilms((prev) =>
      prev.map((film) => (film.id === id ? { ...film, watched: !film.watched } : film))
    );
  };

  const markAllAsWatched = () => {
    setFilms((prev) => prev.map((film) => ({ ...film, watched: true })));
  };

  return (
    <WatchlistContext.Provider
      value={{ films, addFilm, removeFilm, toggleWatched, markAllAsWatched }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
