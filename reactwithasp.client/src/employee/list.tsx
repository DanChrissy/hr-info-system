import EmployeesTable from '@/components/table/employee/data-table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
    const navigate = useNavigate();
    const onAddEmployee = () => {
        navigate('/employees/create');
    }
    return (
        <div className='mx-3'>
            <div className='flex justify-between items-center mx-4'>
                <p className='text-3xl font-bold py-2'>Employees</p>
                <Button onClick={onAddEmployee}>Add Employee</Button>
            </div>
            
            <EmployeesTable/>
        </div>
    )
}