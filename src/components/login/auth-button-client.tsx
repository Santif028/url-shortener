'use client'

import { login, logout } from './actions';
import { User } from '@supabase/supabase-js';
import { useRouter, redirect } from 'next/navigation';


const AuthButton = ({ user }: { user: User | null }) => {
    const router = useRouter();

    const handleLogin = async () => {
        await login();
        router.push('/dashboard');
    }

    const handleLogout = async () => {
        await logout();
        router.push('/');
        router.refresh();
    }

    return (
        <div className=''>
            {
                user === null ? (
                    <button
                        className='hover:text-red-300'
                        onClick={handleLogin}
                    >
                        Login with GitHub
                    </button>
                ) : <button
                    className='hover:text-red-300'
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            }

        </div>
    );
};

export default AuthButton;