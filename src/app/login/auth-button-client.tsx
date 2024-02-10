'use client'

import { login, logout } from './actions';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';


const AuthButton = ({ user }: { user: User | null }) => {
    const router = useRouter();

    const handleLogin = async () => {
        await login();

    }

    const handleLogout = async () => {
        await logout();
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