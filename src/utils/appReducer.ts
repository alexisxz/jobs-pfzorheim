import { AppliedEmail, Company, Job, PrismaClient } from "@prisma/client"


export type Action = {
    type: "ADD_CANDIDATE_EMAIL",
    payload: { selectedJob: Job, candidateEmail: string }
}

export type State = {
    jobsState: Job[],
    companiesState: Company[],
    appliedEmailsState: AppliedEmail[],
}

export const appReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_CANDIDATE_EMAIL": {
            const selectedJob = action.payload.selectedJob
            if (!selectedJob) return state

            const candidateEmail = action.payload.candidateEmail
            if (!candidateEmail) return state

            const newAppliedEmail: AppliedEmail = { id: state.appliedEmailsState.length + 1, jobId: selectedJob.id, name: candidateEmail }

            const newAppliedEmailState: AppliedEmail[] = [...state.appliedEmailsState, newAppliedEmail]

            const newState: State = { ...state, appliedEmailsState: newAppliedEmailState }
            return newState
        }
        default: return state
    }
}