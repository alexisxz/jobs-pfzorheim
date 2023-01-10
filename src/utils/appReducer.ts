import { AppliedEmail, Benefit, Company, Job, Task } from "@prisma/client"


export type Action = {
    type: "ADD_CANDIDATE_EMAIL",
    payload: { selectedJob: Job, candidateEmail: string }
}

export type State = {
    Jobs: Job[],
    Companies: Company[],
    Tasks: Task[],
    Benefits: Benefit[],
    AppliedEmails: AppliedEmail[],
}

export const appReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_CANDIDATE_EMAIL": {
            const selectedJob = action.payload.selectedJob
            if (!selectedJob) return state

            const candidateEmail = action.payload.candidateEmail
            if (!candidateEmail) return state

            const newAppliedEmail: AppliedEmail = { id: state.AppliedEmails.length + 1, jobId: selectedJob.id, name: candidateEmail }

            const newAppliedEmailState: AppliedEmail[] = [...state.AppliedEmails, newAppliedEmail]

            const newState: State = { ...state, AppliedEmails: newAppliedEmailState }
            return newState
        }

        default: return state
    }
}