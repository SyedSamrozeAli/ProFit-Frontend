import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/ContextAuth';

const ProtectedRoute = ({element}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute
