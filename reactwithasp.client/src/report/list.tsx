import ReportCard from '@/components/card/ReportCard';
import { Input } from '@/components/ui/input';
import { jsPDF } from 'jspdf';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import axios from '@/lib/axios';
import { Role } from '@/modules/employee';
import { useState } from 'react';

export default function ReportList() {
  const { toast } = useToast();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [hireCount, setHireCount] = useState<number>(30);

  const generateDocument = async (
    title: string,
    result: string,
    fileName: string,
  ) => {
    const document = new jsPDF();
    document.text(`Generated Report for: ${title} `, 10, 10);
    document.text(`Date: ${new Date().toDateString()}`, 10, 20);
    document.text(`Below you will see the result of this report`, 10, 30);
    document.text(result, 10, 40);

    try {
      document.save(`${fileName}.pdf`);
      toast({
        title: 'Report Generated Successfully',
      });
    } catch (error) {
      toast({
        title: 'Could not generate report at this time.',
        variant: 'destructive',
      });
    }
  };

  const generateEmployeeByRole = async () => {
    try {
      const query = roleFilter === `all` ? `` : `role=${roleFilter}`;
      const result = await axios.get(`/reports/count?${query}`);
      const count = result.data;
      if (count) {
        generateDocument(
          `${roleFilter.toUpperCase()} Employees Count`,
          `Count: ${count.toString()}`,
          `employee-count`,
        );
      }
    } catch (error) {
      toast({
        title: 'Could not generate report at this time.',
        variant: 'destructive',
      });
    }
  };

  const generateHires = async () => {
    try {
      const result = await axios.get(`/reports/hires?days=${hireCount}`);
      const count = result.data;
      if (count) {
        generateDocument(
          `Count of Hires in Last ${hireCount} days`,
          `Count: ${count.toString()}`,
          `hire-recent-count`,
        );
      }
    } catch (error) {
      toast({
        title: 'Could not generate report at this time.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mx-3">
      <div className="flex justify-between items-center mx-4 mb-4">
        <p className="text-3xl font-bold py-2">Reports Generator</p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row mx-4">
        <ReportCard
          title={'Employee Count'}
          description={'You can filter by Role'}
          onGenerate={generateEmployeeByRole}
          content={
            <div className="flex flex-col">
              <Select onValueChange={setRoleFilter} defaultValue={`all`}>
                <SelectTrigger id="role" className="text-black">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value={Role.Admin}>{Role.Admin}</SelectItem>
                  <SelectItem value={Role.Employee}>{Role.Employee}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
        <ReportCard
          title={'Recent Hires Count'}
          description={'You can input the number of days'}
          onGenerate={generateHires}
          content={
            <div className="flex flex-col">
              <Input
                className="text-black"
                type="number"
                maxLength={120}
                defaultValue={30}
                onChange={(e) => {
                  const value = e.target.value;
                  setHireCount(parseInt(value));
                }}
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
