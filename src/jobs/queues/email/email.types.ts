export type EmailJobPayload = {
        type: "verify-email";
        to: string;
        name: string;
        verifyUrl: string;
    }
    | {
        type: "reset-password";
        to: string;
        name: string;
        resetUrl: string;
        expiresInSeconds: number;
    }
    | {
        type: "password-changed";
        to: string;
        name: string;
        changedAt: string;
    };

export type EmailJobName = EmailJobPayload["type"];
