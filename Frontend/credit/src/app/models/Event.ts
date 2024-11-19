import { User } from "./User";

export interface Event {
    id: number;
    event: 'CONFERENCE' | 'WORKSHOP' | 'SEMINAR' | 'ORIENTATION' | 'TRAINING' |
           'TEAM_BUILDING' | 'MENTORSHIP_MEETING' | 'PROJECT_PRESENTATION' |
           'HACKATHON' | 'PERFORMANCE_REVIEW' | 'NETWORKING' | 'CAREER_DEVELOPMENT' |
           'SOCIAL_EVENT' | 'EXIT_INTERVIEW' | 'Q&A_SESSION' | 'COMPANY_OVERVIEW' |
           'INTERNAL_COMPETITION';
    date: Date;
    users: User[]; 
}
