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
 * Design: Acid Brutalism aesthetic matching the landing page
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
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 48px 20px;">
        <table role="presentation" style="width: 100%; max-width: 560px; border-collapse: collapse;">
          
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="width: 44px; height: 44px; background: #CCFF00; border-radius: 12px; text-align: center; vertical-align: middle;">
                    <span style="font-size: 22px; font-weight: 900; color: #000;">S</span>
                  </td>
                  <td style="padding-left: 12px;">
                    <span style="color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -1px;">ScriptFlow</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td style="background: #0a0a0a; border-radius: 24px; border: 1px solid #1a1a1a; padding: 0; overflow: hidden;">
              
              <!-- Glow Header Bar -->
              <div style="height: 4px; background: linear-gradient(90deg, #CCFF00 0%, #8BC34A 50%, #CCFF00 100%);"></div>
              
              <div style="padding: 48px 40px;">
                
                <!-- Badge -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <span style="display: inline-block; background: rgba(204, 255, 0, 0.1); border: 1px solid rgba(204, 255, 0, 0.3); border-radius: 100px; padding: 8px 20px; font-size: 12px; font-weight: 600; color: #CCFF00; letter-spacing: 1px; text-transform: uppercase;">
                    EARLY ACCESS CONFIRMED
                  </span>
                </div>
                
                <!-- Heading -->
                <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 32px; font-weight: 800; text-align: center; line-height: 1.2; letter-spacing: -0.5px;">
                  Welcome, ${name}.
                </h1>
                <p style="margin: 0 0 32px 0; color: #71717a; font-size: 16px; text-align: center;">
                  You're officially on the list.
                </p>
                
                <!-- Spot Number -->
                <div style="text-align: center; margin: 40px 0;">
                  <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
                    <tr>
                      <td style="background: #111111; border: 2px solid #CCFF00; border-radius: 16px; padding: 24px 40px; box-shadow: 0 0 40px rgba(204, 255, 0, 0.15);">
                        <div style="color: #71717a; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">YOUR SPOT</div>
                        <span style="color: #CCFF00; font-size: 48px; font-weight: 900; letter-spacing: -2px;">#${spotNumber}</span>
                        <span style="color: #3f3f46; font-size: 20px; font-weight: 500;"> / ${TOTAL_SPOTS}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                
                ${spotsRemaining > 0 && spotsRemaining <= 20 ? `
                <p style="margin: 0 0 32px 0; color: #ef4444; font-size: 14px; text-align: center; font-weight: 500;">
                  ⚡ Only ${spotsRemaining} spots remaining
                </p>
                ` : ''}
                
                <!-- Divider -->
                <div style="height: 1px; background: linear-gradient(90deg, transparent, #2a2a2a, transparent); margin: 32px 0;"></div>
                
                <!-- What's Next -->
                <table role="presentation" style="width: 100%; margin: 32px 0;">
                  <tr>
                    <td style="padding: 0;">
                      <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 14px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                        What happens next
                      </h2>
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 32px; vertical-align: top;">
                                  <span style="display: inline-block; width: 24px; height: 24px; background: rgba(204, 255, 0, 0.1); border-radius: 6px; text-align: center; line-height: 24px; font-size: 12px;">1</span>
                                </td>
                                <td style="color: #a1a1aa; font-size: 14px; line-height: 1.5;">
                                  <strong style="color: #fff;">Launch notification</strong> — We'll email you the moment ScriptFlow goes live
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 32px; vertical-align: top;">
                                  <span style="display: inline-block; width: 24px; height: 24px; background: rgba(204, 255, 0, 0.1); border-radius: 6px; text-align: center; line-height: 24px; font-size: 12px;">2</span>
                                </td>
                                <td style="color: #a1a1aa; font-size: 14px; line-height: 1.5;">
                                  <strong style="color: #fff;">Early access</strong> — You'll get in before the public launch
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0;">
                            <table role="presentation" style="width: 100%;">
                              <tr>
                                <td style="width: 32px; vertical-align: top;">
                                  <span style="display: inline-block; width: 24px; height: 24px; background: rgba(204, 255, 0, 0.1); border-radius: 6px; text-align: center; line-height: 24px; font-size: 12px;">3</span>
                                </td>
                                <td style="color: #a1a1aa; font-size: 14px; line-height: 1.5;">
                                  <strong style="color: #fff;">Free forever (beta)</strong> — No credit card, no strings attached
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 40px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #3f3f46; font-size: 13px;">
                © 2026 ScriptFlow. All rights reserved.
              </p>
              <p style="margin: 0; color: #27272a; font-size: 11px;">
                You received this because you signed up at scriptflow.app
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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPTFLOW — EARLY ACCESS CONFIRMED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Welcome, ${name}.

You're officially on the list.

┌─────────────────────────────────┐
│  YOUR SPOT: #${spotNumber} / ${TOTAL_SPOTS}              │
└─────────────────────────────────┘

${spotsRemaining > 0 && spotsRemaining <= 20 ? `⚡ Only ${spotsRemaining} spots remaining\n` : ''}

WHAT HAPPENS NEXT
─────────────────

1. Launch notification
   We'll email you the moment ScriptFlow goes live

2. Early access
   You'll get in before the public launch

3. Free forever (beta)
   No credit card, no strings attached

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© 2026 ScriptFlow. All rights reserved.
You received this because you signed up at scriptflow.app
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
      subject: `You're in, ${name} — Spot #${spotNumber} secured`,
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
