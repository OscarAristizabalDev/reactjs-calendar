import { useSelector } from "react-redux";

import { RootState, onChecking, onClearErrorMessage, onLogin, onLogout, onLogoutCalendar, useAppDispatch } from "../store";
import { User } from "../auth";
import { calendarApi } from "../api";

export const useAuthStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();
    // el hook useSelector de react-redux permite leer datos del store
    const { status, errorMessage, user } = useSelector((state: RootState) => state.auth);

    const startLogin = async ({ email, password }: User) => {

        dispatch(onChecking());

        try {

            const { data } = await calendarApi.post('/auth', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            let user: User = {
                email: "",
                name: data.name,
                password: "",
                uid: data.uid
            };

            dispatch(onLogin(user));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10)
        }
    }

    const startRegister = async ({ name, email, password }: User) => {

        dispatch(onChecking());

        try {

            const { data } = await calendarApi.post('/auth/create', { name, email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            let user: User = {
                email: "",
                name: data.name,
                password: "",
                uid: data.uid
            };

            dispatch(onLogin(user));

        } catch (error) {
            dispatch(onLogout(error?.message || '---'))
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(''));

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            let user: User = {
                email: "",
                name: data.name,
                password: "",
                uid: data.uid
            };

            dispatch(onLogin(user));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(''));
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout(''));
    }

    return {
        // Propierties
        errorMessage,
        status,
        user,
        // Methods
        startLogin,
        startLogout,
        startRegister,
        checkAuthToken
    }
}