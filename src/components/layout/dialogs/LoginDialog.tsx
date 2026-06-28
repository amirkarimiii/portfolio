"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/shadcn/dialog";
import {Button} from "@/components/ui/shadcn/button";

export function LoginDialog() {
    return (
        <Dialog>
            <form>
                {/*<DialogTrigger asChild>*/}
                {/*    <Button variant="outline">Open Dialog</Button>*/}
                {/*</DialogTrigger>*/}
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Login to admin mode
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Login</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
