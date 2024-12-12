import { Employee } from "./employee";

export interface Report {
    id: string;
    title: string;
    description?: string;
    generatedBy: Employee;
    createdAt: Date;
    updatedAt: Date;
}