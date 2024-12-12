import { ReactNode, useEffect, useState } from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Navbar from './Navbar';
import { isTokenValid } from '@/lib/token';
import { useLocation } from 'react-router-dom';
import { Toaster } from '../ui/toaster';

export default function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    const valid = isTokenValid(token!);
    setIsValid(valid);

  }, [location]);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Toaster />
      {isValid ? (
        <SidebarProvider className='h-full w-full relative overflow-hidden'>
          <Navbar />
          <main className={`w-full h-full overflow-y-auto`}>
            <SidebarTrigger variant={`default`} className="m-1 absolute opacity-60" />
            <div className={`h-full w-full mt-2`}>
              {children}
              </div>
          </main>
        </SidebarProvider>
      ) : (
        <main className={`w-full h-full`}>
          <div className={`h-full w-full`}>{children}</div>
        </main>
      )}
    </div>
  );
}
