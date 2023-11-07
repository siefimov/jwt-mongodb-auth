import { FC, useState } from 'react';

export const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='text' placeholder='Password' />
            <button>Login</button>
            <button>Registration</button>
        </div>
    );
};
