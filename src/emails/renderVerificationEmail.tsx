import { render } from "@react-email/render";
import { VerificationEmail } from "./VerificationEmail.js";

interface RenderVerificationEmailOptions {
    name: string;
    verificationUrl: string;
    expiresInSeconds: number;
}

export function renderVerificationEmail({
    name,
    verificationUrl,
    expiresInSeconds,
}: RenderVerificationEmailOptions): Promise<string> {
    const publicBaseUrl = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") ?? `http://localhost:${process.env.SERVER_PORT || 8000}`;

    return render(
        <VerificationEmail
            verificationUrl={verificationUrl}
            name={name}
            logoUrl={`${publicBaseUrl}/Logos/logo.png`}
            supportEmail={process.env.SUPPORT_EMAIL || "support@artmes.com"}
            expiresInHours={Math.max(1, Math.round(expiresInSeconds / 3600))}
        />,
    );
}
