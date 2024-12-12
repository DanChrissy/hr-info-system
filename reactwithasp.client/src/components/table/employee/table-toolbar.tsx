import { type Table } from "@tanstack/react-table";
import SearchInput from "@/components/input/SearchInput";

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}
  
export function DataTableToolbar<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex flex-1 flex-wrap items-center space-x-2">
            <SearchInput
                placeholder="Filter employees..."
                onChange={(event) => {
                    table.setGlobalFilter(event.target.value);
                }}
                className="border-0"
                clearSearch={() => {
                    table.resetGlobalFilter();
                }}
            />
        </div>
    )
}