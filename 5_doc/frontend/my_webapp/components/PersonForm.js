import { useState } from 'react';

export default function PersonForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${encodeURIComponent(name)}&age=${age}`,
    });

    if (response.redirected) {
      setSuccess(true);
      setErrors([]);
    } else {
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const errorMessages = Array.from(doc.querySelectorAll('[th\\:errors]')).map(
        (el) => el.textContent
      );
      setErrors(errorMessages);
      setSuccess(false);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl mb-4">Форма регистрации</h1>
      {success && <p className="text-green-500 mb-2">Регистрация успешна!</p>}
      {errors.length > 0 && (
        <ul className="text-red-500 mb-2">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
      <form onSubmit={submitForm}>
        <p>
          <label>Имя: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
          />
        </p>
        <p>
          <label>Возраст: </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2"
          />
        </p>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded">
          Отправить
        </button>
      </form>
    </div>
  );
}
