import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Film } from '../types/film.types';
import fetchFilms from '../api/films';

interface WatchlistContextValue {
  films: Film[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  addFilm: (film: Omit<Film, 'id'>) => void;
  removeFilm: (id: string) => void;
  toggleWatched: (id: string) => void;
  markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [films, setFilms] = useState<Film[]>([]);
  const seededRef = useRef(false);

  const {
    data: serverFilms,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['films'],
    queryFn: fetchFilms,
  });

  useEffect(() => {
    if (serverFilms && !seededRef.current) {
      setFilms(serverFilms);
      seededRef.current = true;
    }
  }, [serverFilms]);

  const addFilm = (filmData: Omit<Film, 'id'>) => {
    const newFilm: Film = { ...filmData, id: Date.now().toString() };
    setFilms((prev) => [...prev, newFilm]);
  };

  const removeFilm = (id: string) => setFilms((prev) => prev.filter((f) => f.id !== id));

  const toggleWatched = (id: string) =>
    setFilms((prev) => prev.map((f) => (f.id === id ? { ...f, watched: !f.watched } : f)));

  const markAllAsWatched = () => setFilms((prev) => prev.map((f) => ({ ...f, watched: true })));

  const handleRefetch = () => {
    seededRef.current = false;
    void refetch();
  };

  return (
    <WatchlistContext.Provider
      value={{
        films,
        isLoading,
        isError,
        refetch: handleRefetch,
        addFilm,
        removeFilm,
        toggleWatched,
        markAllAsWatched,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist musí být použit uvnitř WatchlistProvider');
  return context;
}
