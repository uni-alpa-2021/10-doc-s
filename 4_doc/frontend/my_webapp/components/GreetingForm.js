import { useState } from 'react';

export default function GreetingForm() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState(null);

  const fetchGreeting = async () => {
    try {
      const response = await fetch(`http://localhost:8080/greeting?name=${name}`);
      const data = await response.json();
      setGreeting(data);
    } catch (error) {
      console.error('Ошибка при получении приветствия:', error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl mb-4">Приветствие от сервера</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введи имя"
        className="border p-2 mr-2"
      />
      <button
        onClick={fetchGreeting}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Получить приветствие
      </button>

      {greeting && (
        <p className="mt-4">
          ID: {greeting.id}, Сообщение: {greeting.content}
        </p>
      )}
    </div>
  );
}
