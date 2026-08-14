import { render } from "@react-email/render";
import { WelcomeEmail } from "./WelcomeEmail.js";

interface RenderWelcomeEmailOptions {
    name: string;
}

export function renderWelcomeEmail({
    name,
}: RenderWelcomeEmailOptions): Promise<string> {
    const publicBaseUrl = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") ?? `http://localhost:${process.env.SERVER_PORT || 8000}`;
    const dashboardUrl = process.env.FRONTEND_URL?.replace(/\/$/, "") ?? publicBaseUrl;

    return render(
        <WelcomeEmail
            dashboardUrl={dashboardUrl}
            name={name}
            logoUrl="cid:artmes-logo@artmes"
            supportEmail={process.env.SUPPORT_EMAIL || "support@artmes.com"}
        />,
    );
}
