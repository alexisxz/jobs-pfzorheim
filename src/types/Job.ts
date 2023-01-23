export type Job = {
    id: string,
    title: string,
    shortDescription?: string,
    companyId: string,
    status: boolean,
    location: string,
    field: string,
    role: string,
    postedDate: Date,
    startingDate?: Date,
    workingTime: string,
    tasks: string[],
    benefits: string[],
    profile: string[],
    emailsApplied?: string[],
}