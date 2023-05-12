import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"

export const CalendarApp = () => {
    return (
        // BrowserRouter es requerido para el manejo de rutas
        <BrowserRouter> 
            <AppRouter />
        </BrowserRouter>
    )
}
