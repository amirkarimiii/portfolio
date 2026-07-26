"use client"

import { redirect } from 'next/navigation'
import {Paths} from "@/shared/constants/paths";


export default function NotFound() {
    redirect(Paths.home);
}