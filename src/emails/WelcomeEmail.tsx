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

interface WelcomeEmailProps {
    dashboardUrl: string;
    name: string;
    logoUrl: string;
    supportEmail: string;
}

export function WelcomeEmail({
    dashboardUrl,
    name,
    logoUrl,
    supportEmail,
}: WelcomeEmailProps) {
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
                Welcome to Artmes — your workspace is ready.
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
                            <Text style={eyebrowStyle}>Your workspace is ready</Text>
                            <Heading className="email-heading" style={headingStyle}>
                                Welcome to Artmes, {name}.
                            </Heading>
                            <Text style={subtitleStyle}>
                                Bring every lead, conversation, and next step into one clear
                                pipeline your whole team can trust.
                            </Text>
                            <Button href={dashboardUrl} style={buttonStyle}>
                                Open your workspace
                            </Button>
                        </Section>

                        <Section className="email-padding" style={contentStyle}>
                            <Text style={introStyle}>
                                Hi {name},
                            </Text>
                            <Text style={bodyCopyStyle}>
                                Thanks for joining Artmes. We built your workspace to make
                                the path from first contact to closed deal easier to see and
                                simpler to manage.
                            </Text>
                            <Heading as="h2" style={sectionHeadingStyle}>
                                Start with three quick steps
                            </Heading>
                            <Text style={stepStyle}>
                                <span style={stepNumberStyle}>1</span>
                                <strong>Create your pipeline</strong><br />
                                <span style={stepDescriptionStyle}>
                                    Add stages that match the way your team actually sells.
                                </span>
                            </Text>
                            <Text style={stepStyle}>
                                <span style={stepNumberStyle}>2</span>
                                <strong>Add your first leads</strong><br />
                                <span style={stepDescriptionStyle}>
                                    Keep contacts, context, and follow-ups together.
                                </span>
                            </Text>
                            <Text style={lastStepStyle}>
                                <span style={stepNumberStyle}>3</span>
                                <strong>Invite your team</strong><br />
                                <span style={stepDescriptionStyle}>
                                    Give everyone a shared view of what needs attention next.
                                </span>
                            </Text>

                            <Hr style={dividerStyle} />

                            <Section style={helpStyle}>
                                <Text style={helpHeadingStyle}>Need a hand?</Text>
                                <Text style={helpCopyStyle}>
                                    Reply to this email or contact us at{" "}
                                    <Link href={`mailto:${supportEmail}`} style={linkStyle}>
                                        {supportEmail}
                                    </Link>
                                    . We are happy to help you get set up.
                                </Text>
                            </Section>
                        </Section>
                    </Section>

                    <Section className="email-padding" style={footerStyle}>
                        <Text style={taglineStyle}>
                            Artmes · One pipeline for every lead.
                        </Text>
                        <Text style={footerCopyStyle}>
                            You received this email because an Artmes workspace was created
                            using this email address.
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
    margin: "0 0 30px",
    fontSize: "15px",
    lineHeight: "1.65",
    color: "#3B3F49",
};

const sectionHeadingStyle: CSSProperties = {
    margin: "0 0 18px",
    fontSize: "20px",
    lineHeight: "1.3",
    color: "#20232B",
};

const stepStyle: CSSProperties = {
    margin: "0 0 18px",
    paddingLeft: "38px",
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#20232B",
};

const lastStepStyle: CSSProperties = {
    ...stepStyle,
    margin: 0,
};

const stepNumberStyle: CSSProperties = {
    display: "inline-block",
    width: "26px",
    marginLeft: "-38px",
    marginRight: "12px",
    backgroundColor: "#E8F1FF",
    borderRadius: "13px",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "26px",
    textAlign: "center",
    color: "#006AEA",
};

const stepDescriptionStyle: CSSProperties = {
    color: "#626774",
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
