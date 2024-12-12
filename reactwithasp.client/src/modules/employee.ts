export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    position: string;
    dateOfHire: Date;
    role: Role;
    salary: number;
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    Admin = "Admin",
    Employee = "Employee"
}