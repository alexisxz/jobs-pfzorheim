import { Company } from "../types/Company"
import { Job } from "../types/Job"

export const formatHomeFilter = (selectedJobs: Job[] | undefined, getCompanies: Company[] | undefined) => {
    if (!selectedJobs || !getCompanies) return

    const filteredJobs = selectedJobs.filter((job) => job.status !== false)


    let roles: string[] = []
    filteredJobs.map((job: { role: string }) => {
        if (roles.find(role => role === job.role)) return
        return roles = [...roles, job.role]
    })

    let fields: string[] = []
    filteredJobs.map((job: { field: string }) => {
        if (fields.find(field => field === job.field)) return
        return fields = [...fields, job.field]
    })

    let locations: string[] = []
    filteredJobs.map((job: { location: string }) => {
        if (locations.find(location => location === job.location)) return
        return locations = [...locations, job.location]
    })

    let companies: string[] = []
    filteredJobs.map((job: { companyId: any }) => {
        const companyName = getCompanies.find((company: { id: any }) => company.id === job.companyId)?.name
        if (!companyName) return
        if (companies.find(company => company === companyName)) return
        return companies = [...companies, companyName]
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