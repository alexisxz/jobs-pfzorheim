import { Job } from "@prisma/client"

export const getAllJobs = (jobs: Job[], maxJobCards: number, jobCardsQuantity: number) => {
    let getJobs = []

    for (let i = 0; i < maxJobCards && i < jobCardsQuantity; i++) {
        getJobs.push(jobs[i])
    }

    return getJobs.sort((a, b) => a.postedDate.getTime() - b.postedDate.getTime())
}