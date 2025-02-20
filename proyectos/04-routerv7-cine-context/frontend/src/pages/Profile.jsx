import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
                    <p className="text-gray-600">{user?.username}</p>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <p className="text-gray-600">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile; 