"use client"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/shared/components/ui/alert-dialog";
import {buttonVariants} from "@/shared/components/ui/button";
import {useUnsecureDeleteModal} from "@/features/article-publishing/stores/useUnsecureDelete";


export const UnsecureDeleteModal = () => {
    const { isOpen, uniqueId, closeModal } = useUnsecureDeleteModal();

    const handleConfirm = () => {
        if (!uniqueId) return;

        console.log(uniqueId, " deleted successfully");

        closeModal();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={closeModal}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this draft? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleConfirm}
                    >
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};