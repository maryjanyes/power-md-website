import * as RadixSlider from "@radix-ui/react-slider";
import { useState } from "react";

export function Slider({
    placeholder = "",
    rangeMin = 0,
    rangeMax = 10000,
    symbol = "₴",
    currentRangeValue,
    onChange,
}) {
    const [currentRange, setCurrentRange] = useState([0, 1000]);

    return (
        <div className="w-full max-w-sm py-2 bg-primary-foreground rounded-lg shadow">
            <div className="flex justify-between mb-4 text-sm font-medium">
                <span>{placeholder}</span>
                <span className="text-secondary-foreground">
                    {symbol}{(currentRangeValue?.min) || currentRange[0]} - {symbol}{(currentRangeValue?.max || currentRange[1])}
                </span>
            </div>
      
            <RadixSlider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={currentRangeValue ? [currentRangeValue.min, currentRangeValue.max] : currentRange}
                onValueChange={(val) => {
                    onChange(val);
                    setCurrentRange(val);
                }}
                min={rangeMin}
                max={rangeMax}
                step={1}
            >
                <RadixSlider.Track className="bg-current relative grow h-1 rounded-full">
                    <RadixSlider.Range className="absolute bg-indigo-600 h-full rounded-full" />
                </RadixSlider.Track>
                <RadixSlider.Thumb className="block w-5 h-5 text-secondary-foreground border-2 border-indigo-600 rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <RadixSlider.Thumb className="block w-5 h-5 text-secondary-foreground border-2 border-indigo-600 rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </RadixSlider.Root>
        </div>
    )
}
