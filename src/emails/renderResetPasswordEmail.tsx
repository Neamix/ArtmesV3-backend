import { render } from "@react-email/render";
import { ResetPasswordEmail } from "./ResetPasswordEmail.js";
import { LOGO_SRC } from "./logoAttachment.js";

interface RenderResetPasswordEmailOptions {
    name: string;
    resetUrl: string;
    expiresInSeconds: number;
}

export function renderResetPasswordEmail({
    name,
    resetUrl,
    expiresInSeconds,
}: RenderResetPasswordEmailOptions): Promise<string> {
    return render(
        <ResetPasswordEmail
            resetUrl={resetUrl}
            name={name}
            logoUrl={LOGO_SRC}
            supportEmail={process.env.SUPPORT_EMAIL || "support@artmes.com"}
            expiresInHours={Math.max(1, Math.round(expiresInSeconds / 3600))}
        />,
    );
}
