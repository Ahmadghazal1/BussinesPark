import { Company } from "./company.model";

export interface Suggestion {
    subject: string;
    description: string;
    companyId: string;
    company: Company;
}