import { fakeJobs } from "../data/fakeData"

export const formatJobsList = (companyName: string) => {
    const newJobsList = fakeJobs.filter(job => job.status !== false && job.company.name === companyName)

    return newJobsList
}