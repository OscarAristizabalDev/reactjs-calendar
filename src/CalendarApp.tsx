import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { Provider } from "react-redux"
import { store } from "./store"

export const CalendarApp = () => {
    return (
        // Provee el store a toso los componentes hijos
        <Provider store={store}>
            {/* // BrowserRouter es requerido para el manejo de rutas */}
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}
