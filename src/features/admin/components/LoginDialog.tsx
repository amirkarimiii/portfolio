"use client";

import React, { useState } from "react";
import { Eye, EyeOff, InfoIcon } from "lucide-react";
import { useLoginDialog } from "@/features/admin/stores/loginDialogStore";
import { useAdminLogin } from "@/features/admin/hooks/useAdminAuth";
import { LoginInputSchema } from "@/features/admin/schemas/authSchema";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group";
import { Label } from "@/shared/components/ui/label";
import { Alert, AlertTitle } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";

export function LoginDialog() {
    const open = useLoginDialog((s) => s.open);
    const setOpen = useLoginDialog((s) => s.setOpen);

    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [clientError, setClientError] = useState<string | null>(null);

    const { mutate: login, isPending, error: serverError, reset } = useAdminLogin();

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setPassword("");
            setClientError(null);
            reset();
        }
        setOpen(isOpen);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (clientError) setClientError(null);
        if (serverError) reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isPending) return;

        const validationResult = LoginInputSchema.safeParse({ password });

        if (!validationResult.success) {
            const firstError = validationResult.error.issues[0]?.message || "Invalid input";
            setClientError(firstError);
            return;
        }

        login(validationResult.data.password, {
            onSuccess: () => {
                setPassword("");
                setClientError(null);
                setOpen(false);
            },
        });
    };

    const activeError = clientError || serverError?.message;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="flex flex-col items-center max-w-sm" showCloseButton={false}>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Login</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mt-5 w-full flex flex-col items-center">
                        <Field className="w-full sm:w-70">
                            <Label htmlFor="pass" className="justify-center text-lg">Password</Label>
                            <InputGroup>
                                <InputGroupInput
                                    type={visible ? "text" : "password"}
                                    id="pass"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    disabled={isPending}
                                    autoFocus
                                />
                                <InputGroupAddon align="inline-end" className="cursor-pointer">
                                    <button
                                        type="button"
                                        className="w-5 h-5 flex items-center justify-center focus:outline-none"
                                        onClick={() => setVisible(!visible)}
                                        tabIndex={-1}
                                    >
                                        {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                            {activeError && (
                                <Alert variant="destructive" className="mt-2">
                                    <InfoIcon className="w-4 h-4" />
                                    <AlertTitle className="text-xs">
                                        {activeError}
                                    </AlertTitle>
                                </Alert>
                            )}
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="w-full sm:w-50 mt-4">
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? "Authenticating..." : "Login"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}