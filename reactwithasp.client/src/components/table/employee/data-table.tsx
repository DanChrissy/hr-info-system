import { columns as defaultColumns } from './columns';
// import { api } from "~/utils/api";
import { DataTableToolbar } from './table-toolbar';
import { DataTable } from '../BaseDataTable';
import { useEffect, useState } from 'react';
import { Employee } from '@/modules/employee';
import axios from '@/lib/axios';

interface Props {
  columns?: any;
}
export default function EmployeesTable({ columns }: Props) {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getEmployeesData = async () => {
      setIsLoading(true);
      try {
        const result = (await axios.get('/employees')).data;
        setData(result ?? []);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setData([]);
        setIsLoading(false);
      }
    };

    getEmployeesData();
  }, []);
  return (
    <div className="flex flex-col mx-3 py-3">
      <DataTable
        columns={columns ?? defaultColumns}
        data={data}
        isLoading={isLoading}
        Toolbar={DataTableToolbar}
      />
    </div>
  );
}
