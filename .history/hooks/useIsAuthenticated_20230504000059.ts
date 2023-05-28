import { UserInfoType } from '@/helper/formatApi';
import { useGlobalState } from '@/state';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useIsAuthenticated(userData?: UserInfoType) {
  const [token] = useGlobalState("token");
  const [user, setUser] = useGlobalState("user");
  const router = useRouter();
  
  useEffect(() => {
    setUser(userData as UserInfoType);
  }, [])

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]); 
}

