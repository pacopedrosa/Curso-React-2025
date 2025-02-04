import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
