import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-full h-full p-4 flex flex-col items-center justify-center">
      <span className="font-bold text-2xl">404 Not Found</span>
      <Button
        label={'Zum Dashboard'}
        style={'btn-sm max-w-2/3 mt-4'}
        onClick={() => navigate('/dashboard')}
      />
    </div>
  );
};

export default NotFound;
