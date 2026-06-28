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
import {Eye, EyeOff} from "lucide-react";
import React from "react";

export function LoginDialog() {

    const open = useLoginDialog((s) => s.open);
    const setOpen = useLoginDialog((s) => s.setOpen);
    const [visible, setVisible] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="flex flex-col items-center max-w-sm" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Login</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mt-5 w-full flex flex-col items-center">
                        <Field className="w-full sm:w-70">
                            <Label htmlFor="pass" className="justify-center text-lg">Password</Label>
                            <InputGroup>
                                <InputGroupInput type={visible ? "text" : "password"} id="pass" />
                                <InputGroupAddon align="inline-end" className="cursor-pointer">
                                    <div className="w-5 h-5" onClick={() => setVisible(!visible)}>
                                        {visible ? <EyeOff/> : <Eye/>}
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="w-full sm:w-50">
                            <Button className="w-full" type="submit">Login</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
