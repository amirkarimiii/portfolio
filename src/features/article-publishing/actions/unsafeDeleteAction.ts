import {useUnsecureDeleteModal} from "@/features/article-publishing/stores/useUnsecureDelete";

export const unsafeDeleteAction = (uniqueId: string)=> {
    useUnsecureDeleteModal.getState().openModal(uniqueId);
}