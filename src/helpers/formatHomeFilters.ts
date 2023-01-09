import { Job } from "../types/Job"

export const formatHomeFilter = (selectedJobs: Job[]) => {
    if (!selectedJobs) return

    const filteredJobs = selectedJobs.filter(job => job.status !== false)

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

    let companies: string[] = []
    filteredJobs.map(job => {
        if (companies.find(company => company === job.company.name)) return
        return companies = [...companies, job.company.name]
    })

    return {
        role: roles,
        field: fields,
        location: locations,
        company: companies,
    }
}

export const clearFilters = () => {
    return {
        title: '',
        role: '',
        field: '',
        location: '',
        company: '',
    }
}