import { render } from "@react-email/render";
import { VerificationEmail } from "./VerificationEmail.js";
import { LOGO_SRC } from "./logoAttachment.js";

interface RenderVerificationEmailOptions {
    name: string;
    verificationUrl: string;
}

export function renderVerificationEmail({
    name,
    verificationUrl,
}: RenderVerificationEmailOptions): Promise<string> {
    return render(
        <VerificationEmail
            verificationUrl={verificationUrl}
            name={name}
            logoUrl={LOGO_SRC}
            supportEmail={process.env.SUPPORT_EMAIL || "support@artmes.com"}
        />,
    );
}
