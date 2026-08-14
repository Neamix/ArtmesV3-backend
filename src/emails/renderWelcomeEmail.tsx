import { render } from "@react-email/render";
import { WelcomeEmail } from "./WelcomeEmail.js";

interface RenderWelcomeEmailOptions {
    name: string;
}

export function renderWelcomeEmail({
    name,
}: RenderWelcomeEmailOptions): Promise<string> {
    return render(<WelcomeEmail name={name} />);
}
