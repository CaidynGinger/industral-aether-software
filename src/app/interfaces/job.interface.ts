import { User } from "./user.interface";

export interface JobItem {
    _id: string;
    jobTitle: string;
    issuer: User;
    jobType: string;
    for: User;
    status: string;
    jobDetails: {
        objectAmount: number,
        objectTitle: string,
        selectedItemId: string,
    };
    sectorId: string;
}