import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
    const [formData, setFormData] = useState({
        name: ""
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formData.name}`)
            if(!response.ok){
                throw new Error("Failed to fetch pokemon")
            }
            const data = await response.json()
            navigate(`/pokemon/${data.name}`)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex justify-center items-center gap-4">
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border-2 border-gray-300 rounded-md px-2 py-1"/>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md">Search</button>
        </form>
    </div>
  )
}

export default SearchBar