import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/scripts';

const Home = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        localStorage.setItem("token", "123");
        navigate("/dashboard");
    }
  return (
    <div className='text-center'>
        {!isAuthenticated() ? (
            <section className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold'>Bienvenido a la pagina de inicio</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleLogin}
                >Login</button>
                </section>
        ):(

            <section className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold'>Bienvenido a la pagina de inicio</h1>
            </section>
        )}

        


    </div>

  )

}

export default Home