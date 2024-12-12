import { Role } from '@/modules/employee';
import { z } from 'zod';

export const employeeSchema = z.object({
    firstName: z
        .string({ message: 'First name is required'})
        .trim()
        .min(1, { message: "First name is required"}),
    lastName: z
        .string({ message: 'Last name is required'})
        .trim()
        .min(1, { message: "Last name is required"}),
    email: z
        .string({ message: 'Email is required'})
        .min(1, { message: "Email is required"})
        .email({ message: "Email is invalid"})
        .trim(),
    phoneNumber: z
        .string({ message: "Phone Number is required"})
        .trim()
        .min(1, { message: "Phone Number is required"})
        .max(10, { message: "Phone Number cannot be more than 10 digits "})
        .regex(/^\d{10}$/, { message: "Expecting a 10-digit number"}),
    position: z
        .string({ message: 'Position is required'})
        .trim()
        .min(1, { message: "Position is required"}),
    dateOfHire: z.date({ message: 'Date of Hire is required'}),
    salary: z
        .number({ message: "Salary is required"})
        .positive({ message: 'Salary must be greater that $0 '}),
    role: z.enum([Role.Admin, Role.Employee], { message: "Role is required"})
});