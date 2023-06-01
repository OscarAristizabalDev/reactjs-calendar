import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../store";
import { User } from "../auth";
import { calendarApi } from "../api";

export const useAuthStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();
    // el hook useSelector de react-redux permite leer datos del store
    const { status, errorMessage, user } = useSelector((state: RootState) => state.auth);

    const startLogin = async ({ email, password }: User) => {
        try {

            const resp = await calendarApi.post('/auth', { email, password });

            console.log(resp);

        } catch (error) {
            console.log(error)
        }
    }

    return {
        // Propierties
        errorMessage,
        status,
        user,
        // Methods
        startLogin
    }
}