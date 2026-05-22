import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useWatchlist } from './context/WatchlistContext';
import { useTheme } from './context/ThemeContext';
import WatchlistPage from './pages/WatchlistPage';
import AddFilmPage from './pages/AddFilmPage';

const SunIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Přepnout na světlý motiv' : 'Přepnout na tmavý motiv'}
      aria-pressed={!isDark}
      title={isDark ? 'Světlý motiv' : 'Tmavý motiv'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function App() {
  const { films } = useWatchlist();
  const watchedCount = films.filter((f) => f.watched).length;

  document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`;

  return (
    <div className="app-wrapper">
      {/* // Header with logo and stats */}
      <header className="app-header">
        <h1 className="app-logo">
          Watch<span>list</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <span className="app-stats">
            <strong>{watchedCount}</strong> / {films.length} zhlédnuto
          </span>
          <ThemeToggle />
        </div>
      </header>
      {/* Navigation */}
      <nav className="app-nav" role="navigation" aria-label="Hlavní navigace">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')} //changing style of active link
        >
          Můj watchlist
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')} //changing style of active link
        >
          Přidat film
        </NavLink>
      </nav>
      {/* Main content with routes */}
      <main>
        <Routes>
          <Route path="/" element={<WatchlistPage />} />
          <Route path="/form" element={<AddFilmPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
