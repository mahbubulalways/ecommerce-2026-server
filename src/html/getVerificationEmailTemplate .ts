export const getVerificationEmailTemplate = (code: string) => {
  return `
    <div style="background:#f4f7fa;padding:40px 0;font-family:Arial, sans-serif;">
      <div style="max-width:450px;margin:auto;background:#ffffff;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.08);overflow:hidden;">
        
        <div style="background:#007bff;padding:20px;text-align:center;">
          <h2 style="color:#ffffff;margin:0;font-size:22px;">Buyoro</h2>
        </div>

        <div style="padding:25px 30px;text-align:center;">
          <p style="color:#333;font-size:16px;margin-bottom:15px;">
            Your verification code is
          </p>

          <div style="display:inline-block;background:#f0f4ff;padding:15px 25px;border-radius:8px;font-size:32px;font-weight:bold;color:#007bff;letter-spacing:4px;">
            ${code}
          </div>

          <p style="color:#666;margin-top:20px;font-size:14px;line-height:20px;">
            This code will expire in 
            <strong>2</strong> minutes.<br />
            Please do not share this code with anyone.
          </p>
        </div>

        <div style="background:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#999;">
          If you didn’t request this, you can safely ignore this email.<br/>
          ©Buyoro — All Rights Reserved
        </div>
      </div>
    </div>
  `;
};
