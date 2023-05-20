import { useSelector } from "react-redux"
import { RootState, onCloseDateModal, onOpenDateModal, useAppDispatch } from "../store";

export const useUiStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    // el hook useSelector de react-redux permite leer datos del store
    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal()
    }

    return {
        //propierties
        isDateModalOpen,
        // Methods
        closeDateModal,
        openDateModal,
        toggleDateModal
    }

}