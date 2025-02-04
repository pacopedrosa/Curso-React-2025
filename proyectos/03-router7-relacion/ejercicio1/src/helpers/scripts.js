
export const isAuthenticated = () => {
    //vete al local storage y verifica si el usuario esta autenticado
    const token = localStorage.getItem("token");
    return token ? true : false;
}