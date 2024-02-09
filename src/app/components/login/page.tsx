'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabase';

const AuthLoginPage = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handleGitHubLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github'
            });
            if (error) throw error;
            router.push('/dash')
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='place-self-end'>
            <button
                className='p-2 pl-5 pr-5 '
                onClick={() => handleGitHubLogin()}
                disabled={loading}
            >
                {loading ? 'Logging in' : 'Login with GitHub'}
            </button>
        </div>
    );
};

export default AuthLoginPage;