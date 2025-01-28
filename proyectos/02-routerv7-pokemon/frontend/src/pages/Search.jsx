
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  búsqueda con ombre en la API
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLocaleLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokemon no encontrado");
      }
      // const data = await response.json();
      // console.log(data);
      // navigate(`/pokemon/${data.id}`);
      navigate(`/search/${search.toLocaleLowerCase()}`);
    } catch (error) {
      toast.error("Pokemon no encontrado", 
        {
        style: {
        background: "#fef2f2",
        border: "1px solid #ff",
        color: "#991b1b",}
      });
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buscar Pokemon</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded-lg "
          />
          <button
            type="submit"
            className="bg-rose-300 text-rose-700 hover:text-white hover:bg-rose-600
            px-4 py-2 rounded-lg"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
