import { render } from "@react-email/render";
import { PasswordChangedEmail } from "./PasswordChangedEmail.js";
import { LOGO_SRC } from "./logoAttachment.js";

interface RenderPasswordChangedEmailOptions {
    name: string;
    changedAt: string;
}

export function renderPasswordChangedEmail({
    name,
    changedAt,
}: RenderPasswordChangedEmailOptions): Promise<string> {
    const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "") ?? "";

    return render(
        <PasswordChangedEmail
            name={name}
            logoUrl={LOGO_SRC}
            supportEmail={process.env.SUPPORT_EMAIL || "support@artmes.com"}
            recoverUrl={`${frontendUrl}/forget-password`}
            changedAt={changedAt}
        />,
    );
}
