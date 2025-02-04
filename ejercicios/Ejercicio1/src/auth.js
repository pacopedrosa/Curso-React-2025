export const isAuthenticated = () => !!localStorage.getItem("token");

export const login = () => localStorage.setItem("token", "user-token");

export const logout = () => localStorage.removeItem("token");
