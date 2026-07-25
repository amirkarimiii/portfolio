"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Field, FieldGroup } from "../../ui/shadcn/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/shadcn/input-group";
import { Eye, EyeOff, InfoIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/shadcn/alert";
import { useLoginDialog } from "@/stores/loginDialogStore";
import { useAdminLogin } from "@/hooks/useAdminAuth";

export function LoginDialog() {
    const open = useLoginDialog((s) => s.open);
    const setOpen = useLoginDialog((s) => s.setOpen);

    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("");

    const { mutate: login, isPending, error } = useAdminLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim() || isPending) return;

        login(password, {
            onSuccess: () => {
                setPassword("");
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex flex-col items-center max-w-sm" showCloseButton={false}>
                <form onSubmit={handleSubmit}>
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isPending}
                                    autoFocus
                                />
                                <InputGroupAddon align="inline-end" className="cursor-pointer">
                                    <div className="w-5 h-5" onClick={() => setVisible(!visible)}>
                                        {visible ? <EyeOff /> : <Eye />}
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>
                            {error && (
                                <Alert variant="destructive">
                                    <InfoIcon />
                                    <AlertTitle className="text-xs">
                                        {error.message || "Authentication failed"}
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