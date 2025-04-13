import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const filtered = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Daftar Pokémon</h1>
      <input
        type="text"
        placeholder="Cari Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {loading ? (
        <p className="loading">Loading data Pokémon...</p>
      ) : (
        <div className="grid">
          {filtered.map((pokemon, index) => (
            <div key={index} className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={pokemon.name}
              />
              <h2>{pokemon.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
