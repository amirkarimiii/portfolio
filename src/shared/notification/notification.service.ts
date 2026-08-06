import {toast} from "sonner";
import { NOTIFICATION_MESSAGES, NotificationMessageKey } from "./notification.constants";

type ToastInput = NotificationMessageKey | string;

const resolveMessage = (input: ToastInput): string => {
    if (input in NOTIFICATION_MESSAGES) {
        return NOTIFICATION_MESSAGES[input as NotificationMessageKey];
    }
    return input;
};


export const notify = {
    success: (message: ToastInput) => {
        toast.success(resolveMessage(message));
    },
    error: (message: ToastInput) => {
        toast.error(resolveMessage(message));
    },
    info: (message: ToastInput) => {
        toast.info(resolveMessage(message));
    },
    warning: (message: ToastInput) => {
        toast.warning(resolveMessage(message));
    },
};