import { employeeSchema } from '@/schema/employee';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { Employee, Role } from '@/modules/employee';
import { useNavigate, useParams } from 'react-router-dom';
import DateTimePicker from '@/components/input/DatePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { decodeToken } from '@/lib/token';
import { DecodedToken } from '@/modules/token';

export default function EmployeePage() {
  const params = useParams();
  const userId = params?.id;
  const { role } = decodeToken(
    sessionStorage.getItem('token')!,
  ) as DecodedToken;

  type EmployeeSchema = z.infer<typeof employeeSchema>;
  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (id: string) => {
    try {
      const result = await axios.get(`/employees/${id}`);
      if (result.data) {
        setFormData(result.data);
      }
    } catch (error) {
    }
    setIsLoading(false);
  };

  const setFormData = (data: Employee) => {
    form.setValue(`firstName`, data?.firstName);
    form.setValue(`lastName`, data?.lastName);
    form.setValue(`email`, data?.email);
    form.setValue(`phoneNumber`, data?.phoneNumber);
    form.setValue(`position`, data?.position ?? '');
    form.setValue(`dateOfHire`, data.dateOfHire);
    form.setValue(`salary`, data?.salary ?? 0);
    form.setValue(`role`, data?.role ?? Role.Employee);
  };

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchData(userId);
    }
  }, [userId]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const values = form.getValues();
      const hasDateChanged = form.getFieldState('dateOfHire').isDirty;
      const dateOfHire = hasDateChanged
        ? values.dateOfHire.toISOString().split('T')[0]
        : values.dateOfHire;
      if (userId) {
        await axios.put(`/employees/${userId}`, {
          id: userId,
          ...values,
          dateOfHire,
        });
        setIsLoading(false);
        toast({
          title: `Employee Update Successful`,
        });
      } else {
        await axios.post('/employees', {
          ...values,
          dateOfHire,
        });
        toast({
          title: `Employee Created Successful`,
        });
        setIsLoading(false);
      }

      navigate(`/employees`);
    } catch (error) {
      toast({
        title: `Cannot ${userId ? 'Update' : 'Create'} Employee at this time`,
        variant: `destructive`,
      });
      setIsLoading(false);
    }
  };

  const isReadOnly = role !== Role.Admin;
  return (
    <div className="px-4 pb-4 overflow-auto">
      <div className="border-b-2 border-black mb-4">
        <p className="text-3xl font-bold mb-4">Manage Employee</p>
      </div>
      <Form {...form}>
        <div className="ml-4 w-full flex flex-col gap-y-2 md:w-3/4 lg:w-1/2">
          <FormField
            control={form.control}
            name={`firstName`}
            render={({ field }) => {
              const { onChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={isReadOnly}
                      placeholder="First name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        form.trigger(`firstName`);
                      }}
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={`lastName`}
            render={({ field }) => {
              const { onChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={isReadOnly}
                      placeholder="Last name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        form.trigger(`lastName`);
                      }}
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={`email`}
            render={({ field }) => {
              const { onChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="myemail@example.com"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        form.trigger(`email`);
                      }}
                      readOnly={!!userId || isReadOnly}
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={`phoneNumber`}
            render={({ field }) => {
              const { onChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={isReadOnly}
                      placeholder="876222444"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        form.trigger(`phoneNumber`);
                      }}
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={`position`}
            render={({ field }) => {
              const { onChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={isReadOnly}
                      placeholder="Position"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        form.trigger(`position`);
                      }}
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={`dateOfHire`}
            render={({ field }) => (
              <DateTimePicker label="Date of Hire" field={field} isReadOnly={isReadOnly} />
            )}
          />

          <FormField
            control={form.control}
            name={`salary`}
            render={({ field }) => {
              const { onChange, value, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={isReadOnly}
                      placeholder="Salary"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const targetValue = e.target.value;
                        onChange(parseInt(targetValue));
                        form.trigger(`salary`);
                      }}
                      value={value}
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={`role`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isReadOnly}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.Admin}>{Role.Admin}</SelectItem>
                      <SelectItem value={Role.Employee}>
                        {Role.Employee}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </Form>
      <div className="pt-5">
        {role === Role.Admin && (
          <Button
            onClick={onSubmit}
            disabled={
              Boolean(Object.keys(form.formState.errors).length) || isLoading
            }
          >
            {userId ? 'Update' : 'Save'} Changes
          </Button>
        )}
      </div>
    </div>
  );
}
