import { useState } from 'react';

export default function CustomerList() {
  const [lastName, setLastName] = useState('');
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  const fetch_customers = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/customers?lastName=${lastName}`);
      const data = await response.json();
      setCustomers(data);
      setError(null);
    } catch {
      setError('failed_to_load_data');
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl mb-4">search_customers</h1>
      <form onSubmit={fetch_customers}>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="enter_last_name" className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">find</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <ul className="mt-4">
        {customers.map((c) => (
          <li key={c.id}>ID: {c.id}, first_name: {c.firstName}, last_name: {c.lastName}</li>
        ))}
      </ul>
    </div>
  );
}
