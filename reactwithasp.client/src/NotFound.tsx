import { MdSearchOff } from 'react-icons/md';
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-4">
      <MdSearchOff className="text-[30vh]" />
      <p className="font-bold text-2xl">Not Found</p>
      <Button
        onClick={() => {
          navigate('/employees', { replace: true });
        }}
      >
        Go To Employees Page
      </Button>
    </div>
  );
}
