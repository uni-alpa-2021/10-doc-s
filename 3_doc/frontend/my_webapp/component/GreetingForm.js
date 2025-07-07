import { useState } from 'react';

export default function GreetingForm() {
  const [id, setId] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);

  const submitGreeting = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(id)}&content=${encodeURIComponent(content)}`
      });

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const resultText = Array.from(doc.querySelectorAll('p')).map(p => p.textContent).join('\n');

      setResult(resultText);
    } catch (error) {
      setResult('Ошибка при отправке запроса');
      console.error(error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl mb-4">Форма приветствия</h1>
      <form onSubmit={submitGreeting}>
        <p>
          <label>Id: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border p-2"
          />
        </p>
        <p>
          <label>Сообщение: </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2"
          />
        </p>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Отправить
        </button>
      </form>

      {result && (
        <pre className="mt-4 whitespace-pre-wrap bg-gray-100 p-3 rounded">
          {result}
        </pre>
      )}
    </div>
  );
}
