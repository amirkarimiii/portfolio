import { toast, type ExternalToast } from "sonner";
import { NOTIFICATION_MESSAGES, type NotificationMessageKey } from "./notification.constants";

export type NotifyOptions = ExternalToast;

type ToastInput = NotificationMessageKey | string;

const resolveMessage = (input: ToastInput): string => {
    if (input in NOTIFICATION_MESSAGES) {
        return NOTIFICATION_MESSAGES[input as NotificationMessageKey];
    }
    return input;
};

export const notify = {
    success: (message: ToastInput, options?: NotifyOptions) => {
        toast.success(resolveMessage(message), options);
    },

    error: (message: ToastInput, options?: NotifyOptions) => {
        toast.error(resolveMessage(message), options);
    },

    info: (message: ToastInput, options?: NotifyOptions) => {
        toast.info(resolveMessage(message), options);
    },

    warning: (message: ToastInput, options?: NotifyOptions) => {
        toast.warning(resolveMessage(message), options);
    },

    dismiss: (toastId?: string | number) => {
        toast.dismiss(toastId);
    },
};