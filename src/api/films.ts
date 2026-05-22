import type { Film } from '../types/film.types';

export default async function fetchFilms() {
  const res = await fetch('/films.json');
  if (!res.ok) throw new Error('Nepodařilo se načíst filmy ${res.status}');
  return res.json() as Promise<Film[]>;
}
