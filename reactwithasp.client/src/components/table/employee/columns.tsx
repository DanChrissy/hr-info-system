 
import { type Employee } from "@/modules/employee";
import { type ColumnDef } from "@tanstack/react-table";
import { Link } from 'react-router-dom';
import { DataTableColumnHeader } from "../BaseTableHeader";
import { TableActions } from "./table-action";

export const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => {
        const email= row.original.email;
        return email ? (
          <Link to={`mailto:${email}`} className="underline">{email!}</Link>
        ) : <p>~</p>
      }
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
    },
    {
        accessorKey: "position",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Position" />
        ),
      },
    {
      id: "actions",
      cell: ({ row }) => {
          return (
            <TableActions data={row?.original ?? {}}/>
          )
      }
   }
  ]