import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const RootLayout = () => {
    const navigation = useNavigation();

    return (
        <>
            {navigation.state === "loading" && <Spinner />}
            <Outlet />
        </>
    );
};

export default RootLayout;
