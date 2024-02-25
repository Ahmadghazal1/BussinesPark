import { Sector } from "./sector.model";

export interface Company {
    companyId: string;
    name: string;
    sectorId: string;
    size: number;
    sector: Sector;
    description: string;
    address: string;
    mobileNumber: string;
    email: string;
    createdAccount: boolean;
    // complaintSuggestions?: ComplaintSuggestion[]; // Assuming you have a ComplaintSuggestion interface
    // companyComplaints?: CompanyComplaint[]; // Assuming you have a CompanyComplaint interface
}