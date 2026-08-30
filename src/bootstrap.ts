import { transporter } from "./lib/mail.js";

async function mailVerify() {
    try {
        await transporter.verify();
        console.log("Mailer run successfully");
    } catch {
        console.error("Failed to run mailer")
    }   
}

async function bootstrap() {
    await mailVerify();   
}

export default bootstrap;