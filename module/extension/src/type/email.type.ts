export interface ToMailType {
    to?: string[];
    cc?: string[];
    bcc?: string[];
    from?: string;
    subject: string;
    content: string;
}
