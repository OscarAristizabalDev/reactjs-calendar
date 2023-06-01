import { FormEvent, useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { User } from '..';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onCambiarInput: onLoginInputChange }: any = useForm(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2, onCambiarInput: onRegisterInputChange }: any = useForm(registerFormFields);

    useEffect(() => {
        if (errorMessage != "") {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]) // cada vez que el errorMessage cambie, se ejecuta un efecto


    const loginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let user: User = {
            email: loginEmail,
            name: '',
            password: loginPassword,
            uid: ''
        }

        startLogin(user);
    }

    const registerSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        let user: User = {
            email: registerEmail,
            name: registerName,
            password: registerPassword,
            uid: ''
        }
        startRegister(user);
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gad-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gad-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}