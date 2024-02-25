import { Company } from "./company.model";

export interface Complaint {
    companyComplaintId: string;
    title: string;
    description: string;
    companyId: string;
    company: Company;
}