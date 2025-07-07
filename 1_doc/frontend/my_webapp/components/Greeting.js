import { useState, useEffect } from 'react';
export default function Greeting() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('http://localhost:8080')
            .then((res) => res.text())
            .then((data) => setMessage(data));
    }, []);
    return (
        <div className="p-5 font-sans">
            <h1 className="text-2xl mb-4">Сообщение от сервера</h1>
            <p>{message}</p>
        </div>
    );
}
