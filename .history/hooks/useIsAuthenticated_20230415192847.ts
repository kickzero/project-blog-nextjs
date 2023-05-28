import { useGlobalState } from '@/state';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useIsAuthenticated() {
  const [token] = useGlobalState("token");
  const router = useRouter();
  
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]); 
}

