import { useEffect, useMemo, useState } from "react";

// El custom hook recibe un objeto inicial con las propiedades
export const useForm = (initialForm = {}, formValidations = {}) => {

    // Se utiliza el useState para manipular los valores del objeto
    // el cual quedan almacendado en la variable formState
    // y sus valores de modifican desde la "funcion" setFormState
    const [formState, setFormState] = useState(initialForm);
    const [formValidationState, setFormValidationState] = useState({});

    // useEffect es un hook de react que se ejecuta cada que hay un cambio
    useEffect(() => {
        createValidators();
    }, [formState]); // cada que el formState cambio se llama el metodo createValidators

    useEffect(() => {
        setFormState(initialForm); // se envian los nuevos valores al formulario
    }, [initialForm]); // cada que el initialForm cambie 


    // Memorizamos el valor isFormValid, solo cambia cuando hay un cambio en el formValidationState (formulario)
    const isFormValid = useMemo(
        () => {
            // Se recorren todas las llaves que tiene el objeto formValidationState, es decir, el estado de la validaciones
            for (const formValue of Object.keys(formValidationState)) {
                if (formValidationState[formValue] !== null) return false;
            }
            return true;
        },
        [formValidationState]
    )

    // Del objeto event destructuramos el target
    const onCambiarInput = ({ target }: any) => {

        // destructuracion del target
        const { name, value } = target;
        //console.log(name, value);
        setFormState({
            ...formState,
            [name]: value // aca atributo del objeto formState le asigna el valor
        })
    };

    const onResetForm = () => {
        setFormState(initialForm)
    }

    const createValidators = () => {
        // objeto que va a retornar las validaciones de cada uno de los campos del formulario
        const formCheckedValues = {};
        // Se recorren todas las llaves que tiene el objeto formValidations, es decir los campos del formulario con sus reglas de validacion
        for (const formField of Object.keys(formValidations)) {
            // destructuramos el objeto formValidations, tomando la funcion que valida y el mensaje en caso de cumplirse
            const [fn, errorMessage] = formValidations[formField];
            // a cada campo del formulario se ejecuta la función que valida, si cumple retorna un null, de lo contrario el mensaje de error
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidationState(formCheckedValues);

    }

    return {
        onCambiarInput,
        onResetForm,
        formState,
        ...formState, // Esto permite retornas las propiedad del objeto (username, email, password)
        ...formValidationState, // Esto permite retornas las propiedad del objeto 
        isFormValid
    };
}