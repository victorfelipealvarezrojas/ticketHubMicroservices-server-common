import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdate;
    data: {
        id: string;
        title: string;
        price: string;
        userId: string;
    };
}