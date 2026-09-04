import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import type { CSSProperties } from "react";

interface PasswordChangedEmailProps {
    name: string;
    logoUrl: string;
    supportEmail: string;
    /** Where a user who did not do this can start a fresh reset. */
    recoverUrl: string;
    changedAt: string;
}

export function PasswordChangedEmail({
    name,
    logoUrl,
    supportEmail,
    recoverUrl,
    changedAt,
}: PasswordChangedEmailProps) {
    const currentYear = new Date().getFullYear();

    return (
        <Html lang="en">
            <Head>
                <meta name="color-scheme" content="light only" />
                <meta name="supported-color-schemes" content="light only" />
                <style>{`
                    @media only screen and (max-width: 600px) {
                        .email-container { width: 100% !important; }
                        .email-padding { padding-left: 24px !important; padding-right: 24px !important; }
                        .email-heading { font-size: 30px !important; }
                    }
                `}</style>
            </Head>
            <Preview>
                Your Artmes password was changed.
            </Preview>
            <Body style={bodyStyle}>
                <Container className="email-container" style={containerStyle}>
                    <Section style={cardStyle}>
                        <Section className="email-padding" style={heroStyle}>
                            <Img
                                src={logoUrl}
                                width="188"
                                height="40"
                                alt="Artmes"
                                style={logoStyle}
                            />
                            <Text style={eyebrowStyle}>Security update</Text>
                            <Heading className="email-heading" style={headingStyle}>
                                Your password was changed.
                            </Heading>
                            <Text style={subtitleStyle}>
                                The password for your Artmes account was reset on {changedAt}.
                                You can sign in with it right away.
                            </Text>
                        </Section>

                        <Section className="email-padding" style={contentStyle}>
                            <Text style={introStyle}>
                                Hi {name},
                            </Text>
                            <Text style={bodyCopyStyle}>
                                This is a confirmation that your password was successfully
                                changed. No action is needed if this was you.
                            </Text>

                            <Section style={noticeStyle}>
                                <Text style={noticeCopyStyle}>
                                    For your security, every other session was signed out. You
                                    will need to sign in again on your other devices.
                                </Text>
                            </Section>

                            <Hr style={dividerStyle} />

                            <Section style={helpStyle}>
                                <Text style={helpHeadingStyle}>Was this not you?</Text>
                                <Text style={helpCopyStyle}>
                                    Reset your password again right away, then contact us at{" "}
                                    <Link href={`mailto:${supportEmail}`} style={linkStyle}>
                                        {supportEmail}
                                    </Link>
                                    {" "}so we can help secure your account.
                                </Text>
                                <Button href={recoverUrl} style={secondaryButtonStyle}>
                                    Secure my account
                                </Button>
                            </Section>
                        </Section>
                    </Section>

                    <Section className="email-padding" style={footerStyle}>
                        <Text style={taglineStyle}>
                            Artmes · One pipeline for every lead.
                        </Text>
                        <Text style={footerCopyStyle}>
                            You received this email because the password for the Artmes
                            account on this address was changed.
                        </Text>
                        <Text style={copyrightStyle}>
                            © {currentYear} Artmes, Inc. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const bodyStyle: CSSProperties = {
    margin: 0,
    padding: "32px 12px",
    width: "100%",
    backgroundColor: "#EDEAE0",
    WebkitTextSizeAdjust: "100%",
};

const containerStyle: CSSProperties = {
    width: "600px",
    maxWidth: "600px",
    margin: "0 auto",
};

const eyebrowStyle: CSSProperties = {
    margin: "0 0 14px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#2176FF",
};

const cardStyle: CSSProperties = {
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E2D3",
    borderRadius: "20px",
};

const heroStyle: CSSProperties = {
    padding: "38px 44px 42px",
    backgroundColor: "#0A0B0E",
    borderRadius: "20px 20px 0 0",
};

const logoStyle: CSSProperties = {
    display: "block",
    margin: "0 0 34px",
};

const headingStyle: CSSProperties = {
    margin: "0 0 14px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "36px",
    fontWeight: 700,
    lineHeight: "1.05",
    letterSpacing: "-1px",
    color: "#F5F2EA",
};

const subtitleStyle: CSSProperties = {
    margin: 0,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "15px",
    lineHeight: "1.55",
    color: "#B7B4AC",
};

const contentStyle: CSSProperties = {
    padding: "36px 44px 40px",
    fontFamily: "Helvetica, Arial, sans-serif",
};

const introStyle: CSSProperties = {
    margin: "0 0 10px",
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: "1.55",
    color: "#20232B",
};

const bodyCopyStyle: CSSProperties = {
    margin: "0 0 24px",
    fontSize: "15px",
    lineHeight: "1.65",
    color: "#3B3F49",
};

const noticeStyle: CSSProperties = {
    padding: "14px 18px",
    margin: 0,
    backgroundColor: "#E8F1FF",
    borderRadius: "10px",
};

const noticeCopyStyle: CSSProperties = {
    margin: 0,
    fontSize: "13px",
    lineHeight: "1.55",
    color: "#005BC8",
};

const dividerStyle: CSSProperties = {
    margin: "32px 0",
    borderColor: "#ECE8DE",
};

const helpStyle: CSSProperties = {
    padding: "20px 22px",
    backgroundColor: "#F6F4EE",
    borderRadius: "10px",
};

const helpHeadingStyle: CSSProperties = {
    margin: "0 0 5px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#20232B",
};

const helpCopyStyle: CSSProperties = {
    margin: "0 0 16px",
    fontSize: "13px",
    lineHeight: "1.55",
    color: "#626774",
};

const secondaryButtonStyle: CSSProperties = {
    display: "inline-block",
    padding: "11px 18px",
    backgroundColor: "#20232B",
    borderRadius: "8px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    lineHeight: "18px",
    textDecoration: "none",
    color: "#fff",
};

const linkStyle: CSSProperties = {
    color: "#2176FF",
    textDecoration: "underline",
};

const footerStyle: CSSProperties = {
    padding: "26px 40px 10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    textAlign: "center",
};

const taglineStyle: CSSProperties = {
    margin: "0 0 8px",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "1.5",
    color: "#777366",
};

const footerCopyStyle: CSSProperties = {
    margin: "0 auto",
    maxWidth: "420px",
    fontSize: "11px",
    lineHeight: "1.5",
    color: "#9A9687",
};

const copyrightStyle: CSSProperties = {
    margin: "14px 0 0",
    fontSize: "11px",
    color: "#B3AFA2",
};
