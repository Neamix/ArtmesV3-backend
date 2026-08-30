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

interface VerificationEmailProps {
    verificationUrl: string;
    name: string;
    logoUrl: string;
    supportEmail: string;
    expiresInHours: number;
}

export function VerificationEmail({
    verificationUrl,
    name,
    logoUrl,
    supportEmail,
    expiresInHours,
}: VerificationEmailProps) {
    const currentYear = new Date().getFullYear();
    const expiryLabel = expiresInHours === 1 ? "1 hour" : `${expiresInHours} hours`;

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
                Confirm your email address to activate your Artmes account.
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
                            <Text style={eyebrowStyle}>One step left</Text>
                            <Heading className="email-heading" style={headingStyle}>
                                Confirm your email, {name}.
                            </Heading>
                            <Text style={subtitleStyle}>
                                We just need to know this address belongs to you before your
                                Artmes account goes live.
                            </Text>
                            <Button href={verificationUrl} style={buttonStyle}>
                                Verify my email
                            </Button>
                        </Section>

                        <Section className="email-padding" style={contentStyle}>
                            <Text style={introStyle}>
                                Hi {name},
                            </Text>
                            <Text style={bodyCopyStyle}>
                                Thanks for signing up. Tap the button above to confirm your
                                address — you will be signed in and taken straight to your
                                workspace.
                            </Text>

                            <Section style={noticeStyle}>
                                <Text style={noticeCopyStyle}>
                                    This link expires in <strong>{expiryLabel}</strong> and can
                                    only be used once.
                                </Text>
                            </Section>

                            <Text style={fallbackHeadingStyle}>
                                Button not working?
                            </Text>
                            <Text style={fallbackCopyStyle}>
                                Copy and paste this link into your browser:
                            </Text>
                            <Text style={fallbackLinkWrapStyle}>
                                <Link href={verificationUrl} style={fallbackLinkStyle}>
                                    {verificationUrl}
                                </Link>
                            </Text>

                            <Hr style={dividerStyle} />

                            <Section style={helpStyle}>
                                <Text style={helpHeadingStyle}>Did not sign up?</Text>
                                <Text style={helpCopyStyle}>
                                    You can safely ignore this email — the account stays
                                    unverified and cannot be signed in to. Questions? Reach
                                    us at{" "}
                                    <Link href={`mailto:${supportEmail}`} style={linkStyle}>
                                        {supportEmail}
                                    </Link>
                                    .
                                </Text>
                            </Section>
                        </Section>
                    </Section>

                    <Section className="email-padding" style={footerStyle}>
                        <Text style={taglineStyle}>
                            Artmes · One pipeline for every lead.
                        </Text>
                        <Text style={footerCopyStyle}>
                            You received this email because someone used this address to sign
                            up for Artmes.
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
    margin: "0 0 28px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "15px",
    lineHeight: "1.55",
    color: "#B7B4AC",
};

const buttonStyle: CSSProperties = {
    display: "inline-block",
    padding: "13px 22px",
    backgroundColor: "#2176FF",
    borderRadius: "8px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "20px",
    textDecoration: "none",
    color: "#fff",
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
    margin: "0 0 30px",
    backgroundColor: "#E8F1FF",
    borderRadius: "10px",
};

const noticeCopyStyle: CSSProperties = {
    margin: 0,
    fontSize: "13px",
    lineHeight: "1.55",
    color: "#005BC8",
};

const fallbackHeadingStyle: CSSProperties = {
    margin: "0 0 6px",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "1.5",
    color: "#20232B",
};

const fallbackCopyStyle: CSSProperties = {
    margin: "0 0 10px",
    fontSize: "13px",
    lineHeight: "1.55",
    color: "#626774",
};

const fallbackLinkWrapStyle: CSSProperties = {
    margin: 0,
    padding: "12px 14px",
    backgroundColor: "#F6F4EE",
    borderRadius: "8px",
    fontSize: "12px",
    lineHeight: "1.5",
    wordBreak: "break-all",
};

const fallbackLinkStyle: CSSProperties = {
    color: "#2176FF",
    textDecoration: "none",
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
    margin: 0,
    fontSize: "13px",
    lineHeight: "1.55",
    color: "#626774",
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
