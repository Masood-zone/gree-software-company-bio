import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Img,
} from "@react-email/components";

interface AccountCreatedEmailProps {
  userName?: string;
  userEmail: string;
  signinUrl: string;
}

export function AccountCreatedEmail({
  userName,
  userEmail,
  signinUrl,
}: AccountCreatedEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${process.env.APP_LOGO_URL}`}
              width="120"
              height="120"
              alt="Gree Software Academy"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Text style={heading}>Welcome to Gree Software Academy!</Text>

            <Text style={paragraph}>Hello {userName || userEmail},</Text>

            <Text style={paragraph}>
              Thank you for creating an account with Gree Software Academy.
              We&apos;re excited to have you join our community of learners.
            </Text>

            <Text style={paragraph}>
              Our mission is to teach relevant, real-world skills to the youth
              and beyond. Explore our courses, enroll at your pace, and choose
              flexible payment options to start building your future today.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={signinUrl}>
                Sign in to Your Account
              </Button>
            </Section>

            <Text style={paragraph}>
              If you have any questions or need help, our support team is here
              for you.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Best regards,
              <br />
              The Gree Software Academy Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logoContainer = {
  padding: "32px 20px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "0 48px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
  margin: "0 0 32px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#484848",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "1.4",
  margin: "16px 0 0",
};
