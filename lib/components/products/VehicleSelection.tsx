import { Button } from "@/lib/components/ui/button";

const ButtonComponent: any = Button;

export function VehicleSelection() {
    const handleVehicleSelection = () => { };
    
    return (
        <div className="flex flex-col p-5">
             <ButtonComponent variant="outline" onClick={handleVehicleSelection} className="flex-1 h-12 font-heading font-bold tracking-wider haptic-btn">
                Вибір авто
            </ButtonComponent>
        </div>
    )
}
