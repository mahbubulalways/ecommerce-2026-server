export const getPasswordResetEmailTemplate = (resetLink: string) => {
  return `
  <div style="background:#f4f7fb;padding:40px 0;font-family:Arial, sans-serif;">
    
    <div style="max-width:480px;margin:auto;background:#ffffff;border-radius:12px;box-shadow:0 6px 25px rgba(0,0,0,0.08);overflow:hidden;">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#007bff,#0056d2);padding:22px;text-align:center;">
        <h2 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:0.5px;">
          Buyoro
        </h2>
      </div>

      <!-- Body -->
      <div style="padding:30px;text-align:center;">
        
        <h3 style="color:#333;margin-bottom:10px;">
          Reset Your Password
        </h3>

        <p style="color:#666;font-size:15px;line-height:22px;margin-bottom:25px;">
          We received a request to reset your password.  
          Click the button below to set a new password.
        </p>

        <!-- Reset Button -->
        <a 
          href="${resetLink}"
          style="
            display:inline-block;
            background:#007bff;
            color:#ffffff;
            padding:14px 28px;
            text-decoration:none;
            border-radius:8px;
            font-size:16px;
            font-weight:600;
            box-shadow:0 4px 12px rgba(0,123,255,0.25);
          "
        >
          Reset Password
        </a>

        <p style="color:#999;font-size:13px;margin-top:25px;line-height:20px;">
          This link will expire in <strong>10 minutes</strong>.  
          If you did not request a password reset, you can safely ignore this email.
        </p>

      </div>

      <!-- Footer -->
      <div style="background:#f8f9fb;padding:18px;text-align:center;font-size:12px;color:#999;">
        © Buyoro — All Rights Reserved <br/>
        Need help? Contact our support team
      </div>

    </div>

  </div>
  `;
};
