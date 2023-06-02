import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"


export const AppRouter = () => {

    //const authStatus = 'non-autheticated'
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []) // cada que cargue la aplicación se hace el llamado de la función checkAuthToken
    

    if(status == 'checking'){
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status == 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }

            <Route path="/*" element={<Navigate to={"/auth/login"} />} />

        </Routes>
    )
}
