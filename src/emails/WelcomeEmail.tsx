import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import type { CSSProperties } from "react";

interface WelcomeEmailProps {
    name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
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
                Your Artmes workspace is ready — one pipeline for every lead.
            </Preview>
            <Body style={bodyStyle}>
                <Container className="email-container" style={containerStyle}>
                    <Text className="email-padding" style={eyebrowStyle}>
                        Welcome aboard
                    </Text>

                    <Section style={cardStyle}>
                        <Section className="email-padding" style={heroStyle}>
                            <Text style={logoStyle}>Artmes</Text>
                            <Heading className="email-heading" style={headingStyle}>
                                Welcome, {name}
                            </Heading>
                            <Text style={subtitleStyle}>
                                Your workspace is ready. One pipeline for every lead — set up
                                your stages and start moving deals forward.
                            </Text>
                        </Section>

                        <Section className="email-padding" style={contentStyle}>
                            <Text style={introStyle}>
                                Thanks for joining Artmes. Here is how to get going:
                            </Text>
                            <Text style={listItemStyle}>
                                • Create your first project and shape its stages.
                            </Text>
                            <Text style={listItemStyle}>
                                • Add leads and drag them across your pipeline.
                            </Text>
                            <Text style={lastListItemStyle}>
                                • Invite your team to your workspace when you are ready.
                            </Text>
                        </Section>
                    </Section>

                    <Section className="email-padding" style={footerStyle}>
                        <Text style={taglineStyle}>
                            Sent by Artmes · One pipeline for every lead.
                        </Text>
                        <Text style={copyrightStyle}>© {currentYear} Artmes, Inc.</Text>
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
    width: "560px",
    maxWidth: "560px",
    margin: "0 auto",
};

const eyebrowStyle: CSSProperties = {
    margin: 0,
    padding: "4px 8px 18px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1.4px",
    textAlign: "right",
    textTransform: "uppercase",
    color: "#6B7080",
};

const cardStyle: CSSProperties = {
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E2D3",
    borderRadius: "20px",
};

const heroStyle: CSSProperties = {
    padding: "32px 40px 30px",
    backgroundColor: "#0A0B0E",
    borderRadius: "20px 20px 0 0",
};

const logoStyle: CSSProperties = {
    margin: "0 0 26px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    color: "#B9FF3D",
};

const headingStyle: CSSProperties = {
    margin: "0 0 8px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "34px",
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
    padding: "32px 40px 36px",
    fontFamily: "Helvetica, Arial, sans-serif",
};

const introStyle: CSSProperties = {
    margin: "0 0 16px",
    fontSize: "15px",
    lineHeight: "1.55",
    color: "#3B3F49",
};

const listItemStyle: CSSProperties = {
    margin: "0 0 8px",
    fontSize: "15px",
    lineHeight: "1.55",
    color: "#3B3F49",
};

const lastListItemStyle: CSSProperties = {
    ...listItemStyle,
    margin: 0,
};

const footerStyle: CSSProperties = {
    padding: "26px 40px 10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    textAlign: "center",
};

const taglineStyle: CSSProperties = {
    margin: "0 0 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#9A9687",
};

const copyrightStyle: CSSProperties = {
    margin: "14px 0 0",
    fontSize: "11px",
    color: "#B3AFA2",
};
