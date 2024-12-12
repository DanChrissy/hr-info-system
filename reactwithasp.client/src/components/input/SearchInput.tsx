import { type ChangeEvent, type FunctionComponent, useState } from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { LuSearch, LuX } from 'react-icons/lu';
import { Button } from "@/components/ui/button";

interface Props extends InputProps {
    clearSearch: () => void;
}
const SearchInput: FunctionComponent<Props> = ({ clearSearch, ...props }) => {
    const [value, setValue] = useState<string>();
    function handleValue(e?: ChangeEvent<HTMLInputElement>){
        if (e) {
            setValue(e.currentTarget.value);
        } else {
            setValue("");
        }
    }
    return (
        <div className="h-10 flex items-center rounded-md border border-slate-200 p-[1rem] pr-0">
            <LuSearch size={`1rem`} className=""/>
            <Input
                {...props}
                value={value}
                containerClass="border-0"
                className="h-9 w-[150px] lg:w-[250px] border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                onChange={(event) => {
                    handleValue(event);
                    props?.onChange?.(event);
                }}
            />
            <Button
                onClick={() => {
                    handleValue();
                    clearSearch();
                }}
                className="rounded-none rounded-r-md"
            >
                <LuX size={`1rem`}/>
            </Button>
        </div>
    )
}

export default SearchInput;