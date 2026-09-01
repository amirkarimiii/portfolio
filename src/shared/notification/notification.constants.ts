export const NOTIFICATION_MESSAGES = {
    LOGIN_SUCCESS: "Successfully logged in.",
    LOGOUT_SUCCESS: "Successfully logged out.",

    ARTICLE_PUBLISHED: "Article has been successfully published!",
    ARTICLE_ARCHIVED: "Article moved to archive successfully!",
    ARTICLE_EDIT_PREPARATION_FAILED: "Failed to prepare article for editing.",
    ARTICLE_EDIT_MODE_FAILED: "An error occurred while switching to edit mode.",
    ARTICLE_ARCHIVE_FAILED: "An unexpected error occurred while archiving.",

    SERIES_PUBLISHED: "Series has been published successfully!",

    IMAGE_UPLOAD_SUCCESS: "Image uploaded successfully.",
    IMAGE_REMOVED: "Image removed.",
    IMAGE_VALIDATION_FAILED: "Image Validation Failed",
    IMAGE_DELETE_FAILED: "Could not delete the file from storage.",

    ARTICLE_PUBLISH_UNEXPECTED_ERROR: "Unexpected error during publishing article.",
    UNEXPECTED_ERROR: "Something unexpectedly went wrong!",
    AUTO_SAVE_FAILED: "Network connection issue. Auto-save failed.",
    DRAFT_RESTORED: "Unsaved offline changes have been restored!",
} as const;

export type NotificationMessageKey = keyof typeof NOTIFICATION_MESSAGES;