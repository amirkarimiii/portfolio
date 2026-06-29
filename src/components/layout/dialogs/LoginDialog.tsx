"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn/dialog";
import {Button} from "@/components/ui/shadcn/button";
import {useLoginDialog} from "@/stores/loginDialogStore";
import {Label} from "@/components/ui/shadcn/label";
import {Field, FieldGroup} from "../../ui/shadcn/field";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/shadcn/input-group";
import {Eye, EyeOff, InfoIcon} from "lucide-react";
import React from "react";
import {Alert, AlertTitle} from "@/components/ui/shadcn/alert";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

export function LoginDialog() {

    const open = useLoginDialog((s) => s.open);
    const setOpen = useLoginDialog((s) => s.setOpen);
    const setAuthenticated = useAdminAuthStore((s) => s.setAuthenticated);
    const [visible, setVisible] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;

        setLoading(true);
        setError(null);

        try {

            const response = await fetch(
                "/api/admin/login",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({password}),
                }

            );

            if (!response.ok) {
                const errorData = response.json().catch(() => ({}));
                throw new Error((await errorData).error || (await errorData).message || "Authentication failed");
            }

            setPassword("");
            setOpen(false);
            setAuthenticated(true);

        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }

    }
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
                                    disabled={loading}
                                    autoFocus
                                />
                                <InputGroupAddon align="inline-end" className="cursor-pointer">
                                    <div className="w-5 h-5" onClick={() => setVisible(!visible)}>
                                        {visible ? <EyeOff/> : <Eye/>}
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>
                            {error && (
                                <Alert variant="destructive">
                                    <InfoIcon/>
                                    <AlertTitle className="text-xs">
                                        {error}
                                    </AlertTitle>
                                </Alert>
                            )}
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="w-full sm:w-50 mt-4">
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Authenticating..." : "Login"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
