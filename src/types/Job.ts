import { Company } from "./Company"

// there are collections for: Company, location, field, role, workingTime

export type Job = {
    title: string,
    company: Company,
    status: boolean,
    location: string,
    field: string,
    role: string,
    postedDate: Date,
    startingDate?: Date,
    workingTime: string,
    tasks: string[],
    profile: string[],
    benefits: string[]
}