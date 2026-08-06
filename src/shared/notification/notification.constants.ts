export const NOTIFICATION_MESSAGES = {
    LOGIN_SUCCESS: "Successfully logged in.",
    LOGOUT_SUCCESS: "Successfully logged out.",



} as const;

export type NotificationMessageKey = keyof typeof NOTIFICATION_MESSAGES;