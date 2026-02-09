import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBanner } from "@/components/PageBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <PageBanner
            title="Terms of Service"
            subtitle="Legal terms and conditions for using EquiProfile"
            imageSrc="/images/gallery/20.jpg"
          />
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-8 text-center">
                Last updated: January 5, 2026
              </p>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Acceptance of Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      By accessing and using EquiProfile ("the Service"), you
                      accept and agree to be bound by the terms and provision of
                      this agreement. If you do not agree to these Terms of
                      Service, please do not use the Service.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Description of Service</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      EquiProfile provides a comprehensive horse management
                      platform that includes features for:
                    </p>
                    <ul>
                      <li>Horse profile management and tracking</li>
                      <li>Health records and vaccination tracking</li>
                      <li>Training session management</li>
                      <li>Feeding schedules and nutrition plans</li>
                      <li>Document storage and organization</li>
                      <li>Calendar and event management</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      3. User Accounts and Account Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      To use certain features of the Service, you must register
                      for an account. When you register, you agree to:
                    </p>
                    <ul>
                      <li>
                        Provide accurate, current, and complete information
                      </li>
                      <li>
                        Maintain and promptly update your account information
                      </li>
                      <li>
                        Maintain the security of your password and accept all
                        risks of unauthorized access
                      </li>
                      <li>
                        Immediately notify us of any unauthorized use of your
                        account
                      </li>
                      <li>
                        You are responsible for all activities conducted through
                        your account
                      </li>
                      <li>
                        You must not share your account credentials with others
                      </li>
                      <li>
                        You must be at least 18 years of age to create an
                        account
                      </li>
                    </ul>
                    <p>
                      We reserve the right to suspend or terminate accounts that
                      violate these terms or remain inactive for extended
                      periods.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      4. Subscriptions, Billing & Payment Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <h4>Trial Period</h4>
                    <p>
                      EquiProfile offers a 7-day free trial period for new
                      users. You may cancel at any time during the trial without
                      being charged.
                    </p>

                    <h4>Subscription Plans</h4>
                    <ul>
                      <li>
                        An active subscription is required to continue using
                        premium features after the trial period
                      </li>
                      <li>
                        Subscription plans are available on a monthly or yearly
                        basis
                      </li>
                      <li>
                        All fees are quoted in GBP and are inclusive of UK VAT
                        where applicable
                      </li>
                      <li>Payment is due at the start of each billing cycle</li>
                      <li>
                        Subscriptions automatically renew unless cancelled
                      </li>
                    </ul>

                    <h4>Payment Processing</h4>
                    <p>
                      All payments are processed securely through Stripe. We do
                      not store your complete payment card details. By providing
                      payment information, you authorize us to charge your
                      payment method for all subscription fees.
                    </p>

                    <h4>Cancellation & Refunds</h4>
                    <ul>
                      <li>
                        You can cancel your subscription at any time through
                        your account settings
                      </li>
                      <li>
                        Cancellation takes effect at the end of your current
                        billing period
                      </li>
                      <li>
                        No refunds are provided for partial subscription periods
                      </li>
                      <li>
                        Refunds for billing errors will be processed within 14
                        days
                      </li>
                      <li>
                        We reserve the right to issue refunds on a case-by-case
                        basis at our discretion
                      </li>
                    </ul>

                    <h4>Price Changes</h4>
                    <p>
                      We reserve the right to modify subscription pricing with
                      at least 30 days' notice. Changes will take effect at your
                      next renewal date.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>5. User Content and Data</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      You retain all rights to the data and content you upload
                      to the Service. By using the Service, you grant us:
                    </p>
                    <ul>
                      <li>
                        A license to store, process, and display your content as
                        necessary to provide the Service
                      </li>
                      <li>
                        You are responsible for maintaining backups of your data
                      </li>
                      <li>
                        We reserve the right to remove content that violates
                        these terms
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>6. Acceptable Use Policy</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>You agree not to use the Service to:</p>
                    <ul>
                      <li>
                        Violate any applicable UK or international laws or
                        regulations
                      </li>
                      <li>
                        Infringe on intellectual property rights or other rights
                        of others
                      </li>
                      <li>
                        Transmit harmful or malicious code, viruses, or malware
                      </li>
                      <li>
                        Attempt to gain unauthorized access to the Service,
                        other accounts, or systems
                      </li>
                      <li>
                        Interfere with, disrupt, or place unreasonable burden on
                        the Service
                      </li>
                      <li>
                        Engage in any automated data collection (scraping,
                        crawling, etc.) without permission
                      </li>
                      <li>
                        Impersonate any person or entity or misrepresent your
                        affiliation
                      </li>
                      <li>
                        Upload or transmit false, misleading, or fraudulent
                        information
                      </li>
                      <li>
                        Harass, abuse, threaten, or intimidate other users
                      </li>
                      <li>
                        Use the Service for any illegal or unauthorized purpose
                      </li>
                      <li>
                        Reverse engineer, decompile, or disassemble any part of
                        the Service
                      </li>
                      <li>
                        Resell, rent, lease, or sublicense access to the Service
                        without authorization
                      </li>
                    </ul>
                    <p>
                      We reserve the right to investigate and take appropriate
                      legal action against anyone who violates this Acceptable
                      Use Policy, including removing content, suspending or
                      terminating accounts, and reporting to law enforcement
                      authorities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>7. Intellectual Property</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      The Service and its original content, features, and
                      functionality are owned by EquiProfile and are protected
                      by international copyright, trademark, patent, trade
                      secret, and other intellectual property laws.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>8. Disclaimer of Warranties</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                      WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                      INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                      NON-INFRINGEMENT.
                    </p>
                    <p>WE DO NOT WARRANT THAT:</p>
                    <ul>
                      <li>
                        The Service will be uninterrupted, secure, or error-free
                      </li>
                      <li>The Service will meet your specific requirements</li>
                      <li>Any errors or defects will be corrected</li>
                      <li>The Service will be available at all times</li>
                      <li>Data stored will not be lost or corrupted</li>
                    </ul>
                    <p>
                      Your use of the Service is entirely at your own risk. We
                      recommend maintaining your own backups of all important
                      data.
                    </p>
                    <p className="font-semibold mt-4">
                      IMPORTANT: Nothing in these Terms shall exclude or limit
                      our liability for death or personal injury caused by our
                      negligence, fraud or fraudulent misrepresentation, or any
                      other liability that cannot be excluded or limited under
                      English law.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>9. Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="font-semibold">
                      Subject to the provisions below, to the fullest extent
                      permitted by English law:
                    </p>
                    <p>
                      EQUIPROFILE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                      INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                      INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE,
                      GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR
                      RELATED TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN
                      ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <p>
                      Our total liability to you for any claims arising out of
                      or related to these Terms or the Service shall not exceed
                      the greater of: (a) the amount you have paid us in the 12
                      months preceding the claim, or (b) £100 GBP.
                    </p>
                    <p className="font-semibold mt-4">
                      IMPORTANT LIMITATIONS UNDER UK LAW:
                    </p>
                    <p>
                      Nothing in these Terms shall exclude or limit our
                      liability for:
                    </p>
                    <ul>
                      <li>Death or personal injury caused by our negligence</li>
                      <li>Fraud or fraudulent misrepresentation</li>
                      <li>
                        Any liability that cannot be excluded or limited under
                        English law
                      </li>
                    </ul>
                    <p>
                      These limitations and exclusions apply regardless of the
                      form of action, whether in contract, tort (including
                      negligence), breach of statutory duty, or otherwise.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>10. Termination</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <h4>Termination by You</h4>
                    <p>You may terminate your account at any time by:</p>
                    <ul>
                      <li>
                        Cancelling your subscription through account settings
                      </li>
                      <li>
                        Requesting account deletion via
                        support@equiprofile.online
                      </li>
                    </ul>
                    <p>
                      Upon termination, you will lose access to your account and
                      all associated data. We recommend exporting any important
                      data before terminating your account.
                    </p>

                    <h4>Termination by Us</h4>
                    <p>
                      We may suspend or terminate your account and access to the
                      Service immediately, with or without prior notice, if:
                    </p>
                    <ul>
                      <li>You breach these Terms of Service</li>
                      <li>You violate our Acceptable Use Policy</li>
                      <li>
                        Your account remains inactive for an extended period
                      </li>
                      <li>We are required to do so by law</li>
                      <li>
                        We believe your actions may harm us, other users, or
                        third parties
                      </li>
                      <li>
                        Payment for your subscription fails or is disputed
                      </li>
                    </ul>

                    <h4>Effect of Termination</h4>
                    <p>Upon termination:</p>
                    <ul>
                      <li>Your right to use the Service immediately ceases</li>
                      <li>
                        We may delete your account and data after a reasonable
                        retention period
                      </li>
                      <li>
                        You remain liable for all charges incurred prior to
                        termination
                      </li>
                      <li>
                        Provisions that should survive termination (including
                        liability limitations, intellectual property rights, and
                        governing law) shall continue to apply
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>11. Changes to Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      We reserve the right to modify these terms at any time. We
                      will notify users of any material changes via email or
                      through the Service. Your continued use of the Service
                      after such changes constitutes acceptance of the new
                      terms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>12. Governing Law and Jurisdiction</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of England and Wales. Any
                      disputes arising under or in connection with these Terms
                      shall be subject to the exclusive jurisdiction of the
                      courts of England and Wales.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>13. Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      If you have any questions about these Terms of Service,
                      please contact us at:
                    </p>
                    <p>
                      <strong>Email:</strong> support@equiprofile.online
                      <br />
                      <strong>Website:</strong> https://equiprofile.online
                      <br />
                      <strong>WhatsApp:</strong> +44 7347 258089
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
