import { fakeJobs } from "../data/fakeData";
import { Job } from "../types/Job";

export const formatHomeFilter = () => {
    if (!fakeJobs) return

    const filteredJobs = fakeJobs.filter(job => job.status !== false)

    let roles: string[] = []
    filteredJobs.map(job => {
        if (roles.find(role => role === job.role)) return
        return roles = [...roles, job.role]
    })

    let fields: string[] = []
    filteredJobs.map(job => {
        if (fields.find(field => field === job.field)) return
        return fields = [...fields, job.field]
    })

    let locations: string[] = []
    filteredJobs.map(job => {
        if (locations.find(location => location === job.location)) return
        return locations = [...locations, job.location]
    })

    return {
        role: roles,
        field: fields,
        location: locations
    }


}