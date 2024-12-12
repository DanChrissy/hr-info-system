import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
    label: string;
    field: any;
    isReadOnly?: boolean;
}
const DateTimePicker: FunctionComponent<Props> = ({ label, field, isReadOnly}) => {
    function handleFormatDate() {
        let date = "";
        if (field.value) {
            date = format(field.value, "LLL dd, y");
        }
        return date;
    }
    return (
        <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild disabled={isReadOnly}>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                            <>
                                { handleFormatDate() }
                            </>
                        ): <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col items-center w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        required
                        mode="single"
                        defaultMonth={field.value}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                            date < new Date("1900-01-01")
                        }
                    />
                </PopoverContent>
            </Popover>
            <FormMessage/>
        </FormItem>
    )
}

export default DateTimePicker;