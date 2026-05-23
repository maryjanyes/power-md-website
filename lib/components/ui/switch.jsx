import { Switch as RadixSwitch, SwitchThumb } from "@radix-ui/react-switch";

export function Switch() {
    return (
        <RadixSwitch.Root>
            <SwitchThumb />
        </RadixSwitch.Root>
    );
}
