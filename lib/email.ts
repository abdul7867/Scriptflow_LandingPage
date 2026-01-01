import nodemailer from 'nodemailer';

// Total spots constant - used across the app for consistency
export const TOTAL_SPOTS = 100;

// Create Gmail SMTP transporter
// Uses Gmail App Password for authentication (free, no API needed)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,        // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
  },
});

interface WelcomeEmailParams {
  to: string;
  name: string;
  spotNumber: number;
}

/**
 * Generates a beautiful HTML welcome email template
 */
function getWelcomeEmailHTML(name: string, spotNumber: number): string {
  const spotsRemaining = Math.max(0, TOTAL_SPOTS - spotNumber);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ScriptFlow</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 520px; border-collapse: collapse;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #BDFF00 0%, #8BC34A 100%); border-radius: 10px; text-align: center; vertical-align: middle;">
                    <span style="font-size: 20px;">🎬</span>
                  </td>
                  <td style="padding-left: 10px;">
                    <span style="color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">ScriptFlow</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td style="background: linear-gradient(180deg, #18181b 0%, #0f0f10 100%); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); padding: 48px 40px;">
              
              <!-- Celebration Emoji -->
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="font-size: 56px;">🎉</span>
              </div>
              
              <!-- Heading -->
              <h1 style="margin: 0 0 16px 0; color: #ffffff; font-size: 28px; font-weight: 700; text-align: center; line-height: 1.3;">
                You're In, ${name}!
              </h1>
              
              <!-- Spot Number Badge -->
              <div style="text-align: center; margin: 32px 0;">
                <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
                  <tr>
                    <td style="background: rgba(189, 255, 0, 0.1); border: 2px solid #BDFF00; border-radius: 50px; padding: 16px 32px;">
                      <span style="color: #BDFF00; font-size: 24px; font-weight: 800;">SPOT #${spotNumber}</span>
                      <span style="color: #71717a; font-size: 16px; font-weight: 500;"> of ${TOTAL_SPOTS}</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Welcome Message -->
              <p style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 16px; line-height: 1.7; text-align: center;">
                Welcome aboard! You've secured your spot as one of the <strong style="color: #ffffff;">first ${TOTAL_SPOTS} creators</strong> to get early access to ScriptFlow.
              </p>
              
              ${spotsRemaining > 0 ? `
              <p style="margin: 0 0 32px 0; color: #71717a; font-size: 14px; text-align: center;">
                Only <strong style="color: #ffffff;">${spotsRemaining} spots</strong> remaining!
              </p>
              ` : ''}
              
              <!-- What's Next Section -->
              <table role="presentation" style="width: 100%; background: rgba(255,255,255,0.03); border-radius: 16px; margin: 32px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      ✨ What happens next?
                    </h2>
                    <table role="presentation" style="width: 100%;">
                      <tr><td style="padding: 4px 0; color: #a1a1aa; font-size: 14px;">• We'll notify you the moment ScriptFlow launches</td></tr>
                      <tr><td style="padding: 4px 0; color: #a1a1aa; font-size: 14px;">• You'll get <strong style="color: #BDFF00;">exclusive early access</strong> before anyone else</td></tr>
                      <tr><td style="padding: 4px 0; color: #a1a1aa; font-size: 14px;">• It's <strong style="color: #BDFF00;">100% free</strong> during the beta period</td></tr>
                      <tr><td style="padding: 4px 0; color: #a1a1aa; font-size: 14px;">• Your feedback will help shape the product</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA (optional - for social follow) -->
              <div style="text-align: center; margin-top: 32px;">
                <p style="margin: 0 0 16px 0; color: #71717a; font-size: 13px;">
                  Stay updated on our progress
                </p>
                <a href="https://instagram.com/scriptflow_app" style="display: inline-block; background: rgba(255,255,255,0.1); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; padding: 12px 24px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.15);">
                  Follow @scriptflow_app
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #52525b; font-size: 13px;">
                © 2026 ScriptFlow. All rights reserved.
              </p>
              <p style="margin: 0; color: #3f3f46; font-size: 12px;">
                You received this email because you signed up for the ScriptFlow waitlist.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates a plain text version of the welcome email
 */
function getWelcomeEmailText(name: string, spotNumber: number): string {
  const spotsRemaining = Math.max(0, TOTAL_SPOTS - spotNumber);
  
  return `
🎉 You're In, ${name}!

SPOT #${spotNumber} of ${TOTAL_SPOTS}

Welcome aboard! You've secured your spot as one of the first ${TOTAL_SPOTS} creators to get early access to ScriptFlow.

${spotsRemaining > 0 ? `Only ${spotsRemaining} spots remaining!\n` : ''}

✨ What happens next?

• We'll notify you the moment ScriptFlow launches
• You'll get exclusive early access before anyone else
• It's 100% free during the beta period
• Your feedback will help shape the product

Stay updated: https://instagram.com/scriptflow_app

---
© 2026 ScriptFlow. All rights reserved.
You received this email because you signed up for the ScriptFlow waitlist.
  `.trim();
}

/**
 * Sends a welcome email to new waitlist signups using Gmail SMTP
 * @returns true if email was sent successfully, false otherwise
 */
export async function sendWelcomeEmail({ to, name, spotNumber }: WelcomeEmailParams): Promise<boolean> {
  // Skip if Gmail credentials not configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('[Email] Skipping welcome email - Gmail credentials not configured');
    return false;
  }

  try {
    await transporter.sendMail({
      from: `ScriptFlow <${process.env.GMAIL_USER}>`,
      to: to,
      subject: `🎉 You're In! Welcome to ScriptFlow, ${name}`,
      html: getWelcomeEmailHTML(name, spotNumber),
      text: getWelcomeEmailText(name, spotNumber),
    });

    console.log(`[Email] Welcome email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('[Email] Error sending welcome email:', error);
    return false;
  }
}
