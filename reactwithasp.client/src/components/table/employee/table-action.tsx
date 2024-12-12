import { RxDotsHorizontal } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { type Employee } from "@/modules/employee";
import DeleteEmployee from "@/components/modal/DeleteEmployee";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "@/modules/token";
import { decodeToken } from "@/lib/token";

export function TableActions({ data }: { data: Employee }) {
  const navigate = useNavigate();
  const { id } = decodeToken(sessionStorage.getItem('token')!) as DecodedToken;
  const [isDelete, setIsDelete] = useState<boolean>(false);
  console.log({ id, data: data.id });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-gray-300"
          >
            <RxDotsHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (data.id) {
                navigate(`/employees/${data.id}`);
              }
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Manage</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={id === data.id.toString()}
            onClick={() => setIsDelete(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDelete && (
        <DeleteEmployee employeeId={data?.id} onClose={() => setIsDelete(false)} isOpen={isDelete}/>
      )}
    </>
  );
}
