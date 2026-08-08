"use client";

import {UserButton} from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import {dark} from "@clerk/ui/themes";


interface Props {
    showName?: boolean;
}

export const UserControl = ({ showName }: Props) => {
    const currentTheme = useCurrentTheme();
    return (
        <UserButton
            showName={showName}
            appearance={{
                elements: {
                    useButtonBox: "rounded-md!",
                    userButtonAvatarBox: "rounded-md! size-8!",
                    userButtonTrigger: "rounded-md!"
                },
                theme: currentTheme === "dark" ? dark : undefined,
            }}
        />
    );
};