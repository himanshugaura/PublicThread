interface VerificationEmailOptions {
  name?: string;
  verificationUrl: string;
  appName?: string;
}

export const verificationEmailTemplate = ({
  name,
  verificationUrl,
  appName = "PublicThread",
}: VerificationEmailOptions) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
      <tr>
        <td align="center">
          
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0;color:#333;">Verify Your Email</h2>
              </td>
            </tr>

            <tr>
              <td style="color:#555;font-size:16px;line-height:24px;text-align:center;padding-bottom:30px;">
                ${name ? `Hi ${name},` : "Hello,"}
                <br><br>
                Thanks for signing up for <strong>${appName}</strong>.  
                Please confirm your email address by clicking the button below.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:30px;">
                <a href="${verificationUrl}" 
                   style="
                     background:#4F46E5;
                     color:#ffffff;
                     padding:12px 24px;
                     text-decoration:none;
                     border-radius:6px;
                     font-size:16px;
                     display:inline-block;
                   ">
                  Verify Email
                </a>
              </td>
            </tr>

            <tr>
              <td style="color:#777;font-size:14px;text-align:center;">
                If the button doesn't work, copy and paste this link:
                <br><br>
                <a href="${verificationUrl}" style="color:#4F46E5;text-decoration:none;">
                  ${verificationUrl}
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding-top:30px;text-align:center;font-size:12px;color:#aaa;">
                If you didn’t create an account, you can safely ignore this email.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
`;
};