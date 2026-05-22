import { useNavigate } from 'react-router-dom';
import AddFilmForm from '../components/AddFilmForm';

export default function AddFilmPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="section-label">Přidat film</div>
      <AddFilmForm onSuccess={() => navigate('/')} />
    </>
  );
}
