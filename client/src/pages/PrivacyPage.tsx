import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBanner } from "@/components/PageBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <PageBanner
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your personal information"
            imageSrc="/images/gallery/23.jpg"
          />
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-8 text-center">
                Last updated: January 5, 2026
              </p>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      1. Introduction & Data Protection Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      EquiProfile ("we", "our", or "us") is committed to
                      protecting your privacy and ensuring the security of your
                      personal data. This Privacy Policy explains how we
                      collect, use, disclose, and safeguard your information
                      when you use our Service in compliance with the UK General
                      Data Protection Regulation (UK GDPR) and the Data
                      Protection Act 2018.
                    </p>
                    <p>
                      Please read this privacy policy carefully. If you do not
                      agree with the terms of this privacy policy, please do not
                      access the Service.
                    </p>

                    <h4>Data Protection Summary</h4>
                    <p>As a data controller under UK GDPR, we:</p>
                    <ul>
                      <li>
                        Only collect data necessary for providing our services
                      </li>
                      <li>Process data lawfully, fairly, and transparently</li>
                      <li>
                        Keep your data secure using industry-standard encryption
                      </li>
                      <li>Respect your data protection rights</li>
                      <li>
                        Do not sell your personal information to third parties
                      </li>
                      <li>Retain data only as long as necessary</li>
                    </ul>

                    <h4>Data Controller</h4>
                    <p>
                      EquiProfile is the data controller responsible for your
                      personal data. For data protection queries, contact us at:
                      support@equiprofile.online
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Information We Collect</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <h4>Personal Information</h4>
                    <p>
                      We collect information that you voluntarily provide when
                      using the Service, including:
                    </p>
                    <ul>
                      <li>Name and email address</li>
                      <li>Account credentials</li>
                      <li>
                        Payment information (processed securely through Stripe)
                      </li>
                      <li>Horse profiles and related data</li>
                      <li>Health records and training information</li>
                      <li>Documents you upload</li>
                    </ul>

                    <h4>Automatically Collected Information</h4>
                    <p>
                      When you access the Service, we automatically collect
                      certain information, including:
                    </p>
                    <ul>
                      <li>
                        Device information (browser type, operating system)
                      </li>
                      <li>IP address and location data</li>
                      <li>Usage data (pages viewed, features used)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3. How We Use Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>We use the information we collect to:</p>
                    <ul>
                      <li>Provide, maintain, and improve the Service</li>
                      <li>
                        Process your transactions and manage subscriptions
                      </li>
                      <li>
                        Send you transactional emails (account updates,
                        reminders)
                      </li>
                      <li>Respond to your comments and questions</li>
                      <li>Monitor and analyze usage patterns</li>
                      <li>Detect and prevent fraud or abuse</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>4. Information Sharing and Disclosure</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      We do not sell your personal information. We may share
                      your information in the following circumstances:
                    </p>
                    <ul>
                      <li>
                        <strong>Service Providers:</strong> We use third-party
                        services (Stripe for payments, cloud hosting providers)
                        who process data on our behalf
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> We may disclose
                        information if required by law or in response to valid
                        legal requests
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In the event of a
                        merger, acquisition, or sale of assets, your information
                        may be transferred
                      </li>
                      <li>
                        <strong>With Your Consent:</strong> We may share
                        information with your explicit permission
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>5. Data Security</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      We implement appropriate technical and organizational
                      measures to protect your personal information, including:
                    </p>
                    <ul>
                      <li>Encryption of data in transit and at rest</li>
                      <li>Secure password hashing</li>
                      <li>Regular security assessments</li>
                      <li>Access controls and authentication</li>
                      <li>Secure backup procedures</li>
                    </ul>
                    <p>
                      However, no method of transmission over the Internet is
                      100% secure. While we strive to protect your information,
                      we cannot guarantee absolute security.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>6. Data Retention</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      We retain your personal information for as long as
                      necessary to provide the Service and comply with legal
                      obligations. You can request deletion of your account and
                      data at any time.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      7. Your Data Protection Rights (UK GDPR)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      Under the UK GDPR, you have the following rights regarding
                      your personal data:
                    </p>

                    <h4>Right of Access (Subject Access Request)</h4>
                    <p>
                      You have the right to request a copy of the personal
                      information we hold about you. We will provide this within
                      one month of your request, free of charge.
                    </p>

                    <h4>Right to Rectification</h4>
                    <p>
                      You have the right to request correction of inaccurate or
                      incomplete personal information. You can update most
                      information directly through your account settings.
                    </p>

                    <h4>Right to Erasure ("Right to be Forgotten")</h4>
                    <p>
                      You have the right to request deletion of your personal
                      information in certain circumstances, including when:
                    </p>
                    <ul>
                      <li>
                        The data is no longer necessary for the purpose it was
                        collected
                      </li>
                      <li>
                        You withdraw consent and there is no other legal basis
                        for processing
                      </li>
                      <li>
                        You object to processing and there are no overriding
                        legitimate grounds
                      </li>
                      <li>The data has been unlawfully processed</li>
                    </ul>

                    <h4>Right to Restriction of Processing</h4>
                    <p>
                      You have the right to request that we restrict processing
                      of your personal data in certain circumstances, such as
                      when you contest the accuracy of the data.
                    </p>

                    <h4>Right to Data Portability</h4>
                    <p>
                      You have the right to receive your personal data in a
                      structured, commonly used, machine-readable format and
                      transmit it to another controller.
                    </p>

                    <h4>Right to Object</h4>
                    <p>
                      You have the right to object to processing of your
                      personal data based on legitimate interests or for direct
                      marketing purposes at any time.
                    </p>

                    <h4>Right to Withdraw Consent</h4>
                    <p>
                      Where we process your data based on consent, you have the
                      right to withdraw that consent at any time.
                    </p>

                    <h4>Right to Lodge a Complaint</h4>
                    <p>
                      You have the right to lodge a complaint with the
                      Information Commissioner's Office (ICO), the UK's data
                      protection supervisory authority:
                    </p>
                    <ul>
                      <li>
                        Website:{" "}
                        <a
                          href="https://ico.org.uk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          https://ico.org.uk
                        </a>
                      </li>
                      <li>Helpline: 0303 123 1113</li>
                    </ul>

                    <h4>Exercising Your Rights</h4>
                    <p>
                      To exercise any of these rights, please contact us at:
                      <br />
                      <strong>Email:</strong> support@equiprofile.online
                      <br />
                      <strong>WhatsApp:</strong> +44 7347 258089
                    </p>
                    <p>
                      We will respond to your request within one month. In some
                      cases, we may need to verify your identity before
                      processing your request.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>8. Cookies Policy</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <h4>What Are Cookies?</h4>
                    <p>
                      Cookies are small text files stored on your device when
                      you visit our Service. They help us provide you with a
                      better experience by remembering your preferences and
                      settings.
                    </p>

                    <h4>Types of Cookies We Use</h4>

                    <p>
                      <strong>Essential Cookies (Strictly Necessary)</strong>
                    </p>
                    <p>
                      These cookies are necessary for the Service to function
                      and cannot be disabled. They include:
                    </p>
                    <ul>
                      <li>Session cookies to maintain your login state</li>
                      <li>
                        Security cookies to prevent fraud and secure access
                      </li>
                      <li>Load balancing cookies for optimal performance</li>
                    </ul>

                    <p>
                      <strong>Functional Cookies</strong>
                    </p>
                    <p>These cookies remember your preferences and choices:</p>
                    <ul>
                      <li>Theme preferences (light/dark mode)</li>
                      <li>Language settings</li>
                      <li>Display preferences</li>
                    </ul>

                    <p>
                      <strong>Analytics Cookies</strong>
                    </p>
                    <p>
                      These cookies help us understand how visitors use our
                      Service:
                    </p>
                    <ul>
                      <li>Usage patterns and popular features</li>
                      <li>Performance monitoring</li>
                      <li>Error tracking and diagnostics</li>
                    </ul>

                    <h4>Managing Cookies</h4>
                    <p>
                      You can control and manage cookies through your browser
                      settings. Most browsers allow you to:
                    </p>
                    <ul>
                      <li>View and delete cookies</li>
                      <li>Block third-party cookies</li>
                      <li>Block cookies from specific sites</li>
                      <li>Clear all cookies when you close your browser</li>
                    </ul>

                    <p className="font-semibold mt-4">
                      Please note: Disabling certain cookies may affect the
                      functionality of the Service. Essential cookies cannot be
                      disabled as they are required for the Service to work.
                    </p>

                    <h4>Third-Party Cookies</h4>
                    <p>
                      We use limited third-party services that may set cookies:
                    </p>
                    <ul>
                      <li>Stripe for payment processing</li>
                      <li>Cloud hosting providers for infrastructure</li>
                    </ul>
                    <p>
                      These third parties have their own privacy policies and
                      cookie policies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>9. Children's Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      The Service is not intended for children under 13 years of
                      age. We do not knowingly collect personal information from
                      children under 13. If you believe we have collected
                      information from a child under 13, please contact us
                      immediately.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>10. International Data Transfers</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      Your information may be transferred to and processed in
                      countries other than your country of residence. These
                      countries may have different data protection laws. By
                      using the Service, you consent to such transfers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>11. Changes to This Privacy Policy</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      We may update this Privacy Policy from time to time. We
                      will notify you of any material changes by email or
                      through a notice on the Service. The "Last updated" date
                      at the top indicates when this policy was last revised.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>12. Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      If you have questions or concerns about this Privacy
                      Policy, wish to exercise your data protection rights, or
                      need to report a data protection concern, please contact
                      us:
                    </p>
                    <p>
                      <strong>Email:</strong> support@equiprofile.online
                      <br />
                      <strong>WhatsApp:</strong> +44 7347 258089
                      <br />
                      <strong>Website:</strong> https://equiprofile.online
                    </p>
                    <p>
                      We aim to respond to all queries within 48 hours and
                      subject access requests within one month as required by UK
                      GDPR.
                    </p>

                    <h4>Supervisory Authority</h4>
                    <p>
                      If you are not satisfied with our response or believe we
                      are processing your data unlawfully, you have the right to
                      lodge a complaint with the Information Commissioner's
                      Office (ICO):
                    </p>
                    <p>
                      <strong>Information Commissioner's Office</strong>
                      <br />
                      Wycliffe House, Water Lane
                      <br />
                      Wilmslow, Cheshire SK9 5AF
                      <br />
                      <strong>Website:</strong>{" "}
                      <a
                        href="https://ico.org.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://ico.org.uk
                      </a>
                      <br />
                      <strong>Helpline:</strong> 0303 123 1113
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      13. UK GDPR Compliance & Legal Basis for Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      We comply with the UK General Data Protection Regulation
                      (UK GDPR) and the Data Protection Act 2018. This Privacy
                      Policy is governed by the laws of England and Wales.
                    </p>

                    <h4>Legal Basis for Processing Your Personal Data</h4>
                    <p>
                      Under UK GDPR, we must have a legal basis to process your
                      personal data. We process your data based on:
                    </p>

                    <p>
                      <strong>1. Contract Performance</strong>
                    </p>
                    <p>
                      Processing necessary to provide the Service you've
                      requested, including:
                    </p>
                    <ul>
                      <li>Creating and managing your account</li>
                      <li>Providing horse management features</li>
                      <li>Processing payments and managing subscriptions</li>
                      <li>
                        Communicating about your account and service updates
                      </li>
                    </ul>

                    <p>
                      <strong>2. Consent</strong>
                    </p>
                    <p>Where you have given explicit consent, such as:</p>
                    <ul>
                      <li>Marketing communications</li>
                      <li>Optional analytics and tracking</li>
                      <li>
                        Specific data processing activities requiring consent
                      </li>
                    </ul>
                    <p>
                      You can withdraw your consent at any time through your
                      account settings or by contacting us.
                    </p>

                    <p>
                      <strong>3. Legitimate Interests</strong>
                    </p>
                    <p>
                      Processing necessary for our legitimate business
                      interests, including:
                    </p>
                    <ul>
                      <li>Improving and developing the Service</li>
                      <li>
                        Detecting and preventing fraud and security threats
                      </li>
                      <li>Understanding how users interact with our Service</li>
                      <li>Internal analytics and business intelligence</li>
                    </ul>
                    <p>
                      We only rely on legitimate interests when they are not
                      overridden by your data protection rights.
                    </p>

                    <p>
                      <strong>4. Legal Obligation</strong>
                    </p>
                    <p>
                      Processing required to comply with legal obligations,
                      including:
                    </p>
                    <ul>
                      <li>Complying with tax and accounting requirements</li>
                      <li>Responding to legal requests and court orders</li>
                      <li>Preventing money laundering and fraud</li>
                      <li>Maintaining records required by law</li>
                    </ul>

                    <h4>International Data Transfers</h4>
                    <p>
                      Your data is primarily stored and processed in the UK.
                      Where we transfer data outside the UK, we ensure
                      appropriate safeguards are in place, including:
                    </p>
                    <ul>
                      <li>
                        Standard Contractual Clauses (SCCs) approved by the UK
                        ICO
                      </li>
                      <li>
                        Adequacy decisions recognizing equivalent data
                        protection
                      </li>
                      <li>Other approved transfer mechanisms under UK GDPR</li>
                    </ul>

                    <h4>Data Protection Officer</h4>
                    <p>
                      For data protection queries, contact our team at:
                      support@equiprofile.online
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
