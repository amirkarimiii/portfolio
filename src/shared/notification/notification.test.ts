import { describe, it, expect, vi, beforeEach } from "vitest";
import { toast } from "sonner";
import { notify } from "./notification.service";
import { NOTIFICATION_MESSAGES } from "./notification.constants";

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn(),
    },
}));

describe("notify service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("resolveMessage behavior", () => {
        it("should resolve a known key to its predefined message", () => {
            notify.success("LOGIN_SUCCESS");
            expect(toast.success).toHaveBeenCalledWith(
                NOTIFICATION_MESSAGES.LOGIN_SUCCESS
            );
        });

        it("should pass through an arbitrary string that is not a known key", () => {
            const customMessage = "this is a custom message";
            notify.error(customMessage);
            expect(toast.error).toHaveBeenCalledWith(customMessage);
        });
    });

    describe("notify.success", () => {
        it("should call toast.success with resolved message", () => {
            notify.success("LOGOUT_SUCCESS");
            expect(toast.success).toHaveBeenCalledTimes(1);
            expect(toast.success).toHaveBeenCalledWith(
                NOTIFICATION_MESSAGES.LOGOUT_SUCCESS
            );
        });
    });

    describe("notify.error", () => {
        it("should call toast.error with resolved message", () => {
            notify.error("LOGIN_SUCCESS");
            expect(toast.error).toHaveBeenCalledTimes(1);
            expect(toast.error).toHaveBeenCalledWith(
                NOTIFICATION_MESSAGES.LOGIN_SUCCESS
            );
        });
    });

    describe("notify.info", () => {
        it("should call toast.info with resolved message", () => {
            notify.info("LOGOUT_SUCCESS");
            expect(toast.info).toHaveBeenCalledTimes(1);
            expect(toast.info).toHaveBeenCalledWith(
                NOTIFICATION_MESSAGES.LOGOUT_SUCCESS
            );
        });
    });

    describe("notify.warning", () => {
        it("should call toast.warning with resolved message", () => {
            notify.warning("this is a custom warning message");
            expect(toast.warning).toHaveBeenCalledTimes(1);
            expect(toast.warning).toHaveBeenCalledWith("this is a custom warning message");
        });
    });
});