import { loginSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { isTokenValid } from '@/lib/token';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  type LoginSchema = z.infer<typeof loginSchema>;
  const form = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordView = () => setShowPassword(!showPassword);
  const { toast } = useToast();

  const customFieldProps =
    'h-10 bg-slate-100 text-base text-[#3D404A] border-slate-200';

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const values = form.getValues();
      const response = await axios.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      toast({
        title: `Login Successful`,
      })
      form.clearErrors();
      sessionStorage.setItem('token', response.data.token);
      navigate('/employees');
    } catch (err) {
        toast({
          title: `Could not login at this time`,
          variant: `destructive`,
        })
    }
  };

  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   if (location.pathname === '/auth/login') {
  //     if (isTokenValid(token!)) {
  //       console.log('HERE 2');
  //       navigate('/employees');
  //     }
  //   }
  // }, [location, navigate]);

  return (
    <div className="flex h-full overflow-hidden min-w-full bg-white py-24 justify-center lg:py-0 lg:items-center">
      <div className="flex flex-col w-10/12 sm:w-8/12 lg:w-4/12 items-center gap-y-6">
        <h2 className="font-bold text-5xl">HR Information Portal</h2>
        <p className="text-[#1C1C21] font-bold text-3xl py-3">Login Form</p>
        <div className="w-full">
          <Form {...form}>
            <div className="flex flex-col gap-6">
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
                          }}
                          className={customFieldProps}
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
                name={`password`}
                render={({ field }) => {
                  const { onChange, ...restField } = field;
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mypassword"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            onChange(e);
                          }}
                          type={showPassword ? `text` : `password`}
                          icon={
                            !showPassword ? (
                              <LuEye
                                size={`1rem`}
                                onClick={togglePasswordView}
                              />
                            ) : (
                              <LuEyeOff
                                size={`1rem`}
                                onClick={togglePasswordView}
                              />
                            )
                          }
                          className={customFieldProps}
                          {...restField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </Form>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Button
            variant={`outline`}
            onClick={onSubmit}
            className="w-full py-4 bg-[#617AFA] text-white hover:bg-[#617AFA]/70 hover:text-white"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
