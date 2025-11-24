import { Navigate } from "react-router-dom"
import { useAppSelector } from "../store/hooks"

const HomePage = () => {
    const { role } = useAppSelector((state) => state.auth)

    if (role === 'seller') {
        return <Navigate to="/sellers/dashboard" replace />
    } else if (role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />
    } else {
        return <Navigate to="/login" replace />
    }
}

export default HomePage