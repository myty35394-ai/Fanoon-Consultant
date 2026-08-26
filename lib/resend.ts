import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface ApplicationEmailData {
  role: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  currentPosition?: string;
  highestQualification: string;
  institution?: string;
  registrationNumber?: string;
  affiliations?: string;
  specialization?: string;
  softwareProficiency: string[];
  department: string;
  availability: string;
  motivation: string;
  portfolioLink?: string;
  resumeFile?: {
    name: string;
    buffer: Buffer;
  };
}

export async function sendJobApplicationEmail(data: ApplicationEmailData) {
  const adminEmail = (process.env.ADMIN_EMAIL || "fanoonconsultants9@gmail.com").trim().toLowerCase();
  // You can customize the from email once your domain is verified on Resend (e.g. "applications@fanoonconsultants.com" or "onboarding@resend.dev")
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Fanoon Careers <onboarding@resend.dev>";

  const softwareBadgesHtml = data.softwareProficiency.length > 0
    ? data.softwareProficiency
        .map(
          (s) =>
            `<span style="display:inline-block; background-color:#e8f5ed; color:#169B62; font-size:12px; font-weight:600; padding:4px 10px; border-radius:4px; margin:2px 4px 4px 0; border:1px solid #c2e5d1;">${s}</span>`
        )
        .join("")
    : "<span style='color:#888;'>None specified</span>";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application - ${data.role}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f5; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#222222;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f5; padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="650" cellpadding="0" cellspacing="0" style="max-width:650px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06); border:1px solid #eaeaea;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#0a0f0c; padding:35px 30px; text-align:left;">
              <div style="font-size:11px; font-weight:bold; letter-spacing:2px; color:#169B62; text-transform:uppercase; margin-bottom:8px;">
                NEW JOB APPLICATION
              </div>
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:bold; line-height:1.2;">
                ${data.role}
              </h1>
              <p style="color:#a0aab0; font-size:13px; margin:6px 0 0 0;">
                Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:30px;">
              
              <!-- 1. Applicant Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td colspan="2" style="border-bottom:2px solid #169B62; padding-bottom:6px; margin-bottom:15px;">
                    <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#169B62; margin:0; font-weight:bold;">
                      1. Personal & Contact Information
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Full Name:</td>
                  <td style="padding:10px 0; font-size:14px; font-weight:600; color:#111111;">${data.fullName}</td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; width:40%; font-weight:bold; font-size:13px; color:#555555;">Email Address:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#169B62; font-weight:500;">
                    <a href="mailto:${data.email}" style="color:#169B62; text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Phone Number:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222;">
                    <a href="tel:${data.phone}" style="color:#222222; text-decoration:none; font-weight:500;">${data.phone}</a>
                  </td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; width:40%; font-weight:bold; font-size:13px; color:#555555;">Location / City:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222; text-transform:capitalize;">${data.location}</td>
                </tr>
              </table>

              <!-- 2. Professional & Academic Background -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td colspan="2" style="border-bottom:2px solid #169B62; padding-bottom:6px; margin-bottom:15px;">
                    <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#169B62; margin:0; font-weight:bold;">
                      2. Professional & Academic Background
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Experience:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222;">${data.experience}</td>
                </tr>
                ${data.currentPosition ? `
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; font-weight:bold; font-size:13px; color:#555555;">Current Position:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222;">${data.currentPosition}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding:10px 0; font-weight:bold; font-size:13px; color:#555555;">Highest Qualification:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222;">${data.highestQualification}</td>
                </tr>
                ${data.institution ? `
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; font-weight:bold; font-size:13px; color:#555555;">University / Institution:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222;">${data.institution}</td>
                </tr>` : ""}
                ${data.registrationNumber ? `
                <tr>
                  <td style="padding:10px 0; font-weight:bold; font-size:13px; color:#555555;">Registration No (PEC/PCATP/AIQS):</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222; font-weight:600;">${data.registrationNumber}</td>
                </tr>` : ""}
                ${data.affiliations ? `
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; font-weight:bold; font-size:13px; color:#555555;">Professional Affiliations:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222;">${data.affiliations}</td>
                </tr>` : ""}
                ${data.specialization ? `
                <tr>
                  <td style="padding:10px 0; font-weight:bold; font-size:13px; color:#555555;">Specialization / Expertise:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222; text-transform:capitalize;">${data.specialization}</td>
                </tr>` : ""}
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; font-weight:bold; font-size:13px; color:#555555; vertical-align:top;">Software Proficiency:</td>
                  <td style="padding:10px 8px; font-size:13px; color:#222222;">
                    ${softwareBadgesHtml}
                  </td>
                </tr>
              </table>

              <!-- 3. Application Details & Motivation -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td colspan="2" style="border-bottom:2px solid #169B62; padding-bottom:6px; margin-bottom:15px;">
                    <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#169B62; margin:0; font-weight:bold;">
                      3. Application Details & Availability
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Preferred Department:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222; text-transform:capitalize;">${data.department}</td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; font-weight:bold; font-size:13px; color:#555555;">Availability:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222; text-transform:capitalize;">${data.availability}</td>
                </tr>
                ${data.portfolioLink ? `
                <tr>
                  <td style="padding:10px 0; font-weight:bold; font-size:13px; color:#555555;">Portfolio Link:</td>
                  <td style="padding:10px 0; font-size:14px;">
                    <a href="${data.portfolioLink}" target="_blank" style="color:#169B62; font-weight:600; text-decoration:underline;">
                      View Online Portfolio / Drive &rarr;
                    </a>
                  </td>
                </tr>` : ""}
              </table>

              <!-- Motivation Statement -->
              <div style="background-color:#f9fbf9; border-left:4px solid #169B62; padding:15px 20px; border-radius:4px; margin-bottom:25px;">
                <div style="font-size:12px; font-weight:bold; color:#169B62; text-transform:uppercase; margin-bottom:6px;">
                  Why they want to join Fanoon Consultants:
                </div>
                <div style="font-size:13.5px; line-height:1.6; color:#333333; font-style:italic;">
                  &ldquo;${data.motivation}&rdquo;
                </div>
              </div>

              <!-- Attachments Note -->
              ${data.resumeFile ? `
              <div style="background-color:#f0f7f3; border:1px dashed #169B62; padding:12px 18px; border-radius:6px; text-align:center;">
                <span style="font-size:13px; color:#169B62; font-weight:600;">
                  &#128206; Attached CV/Portfolio: <strong>${data.resumeFile.name}</strong>
                </span>
                <div style="font-size:11px; color:#666666; margin-top:2px;">
                  (Downloaded directly as attachment with this email)
                </div>
              </div>` : `
              <div style="background-color:#fff3cd; border:1px solid #ffeeba; padding:10px 15px; border-radius:6px; font-size:12px; color:#856404; text-align:center;">
                No file document attached.
              </div>`}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa; border-top:1px solid #eeeeee; padding:20px 30px; text-align:center; font-size:12px; color:#888888;">
              This is an automated notification sent from <strong>Fanoon Consultants Careers Portal</strong>.<br>
              To respond to the applicant, simply reply to <a href="mailto:${data.email}" style="color:#169B62;">${data.email}</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[RESEND_WARNING] RESEND_API_KEY is not set. Simulating email dispatch. Application data:",
      {
        role: data.role,
        fullName: data.fullName,
        email: data.email,
        resumeFileName: data.resumeFile?.name,
      }
    );
    return { success: true, simulated: true };
  }

  const resendClient = new Resend(apiKey);

  const attachments = data.resumeFile
    ? [
        {
          filename: data.resumeFile.name,
          content: data.resumeFile.buffer,
        },
      ]
    : undefined;

  const response = await resendClient.emails.send({
    from: fromEmail,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Job Application: ${data.fullName} - ${data.role}`,
    html: htmlContent,
    attachments,
  });

  if (response.error) {
    console.error("[RESEND_API_ERROR]", response.error);
    throw new Error(
      response.error.message || "Failed to send email via Resend API"
    );
  }

  return { success: true, response };
}

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  location?: string | null;
  service?: string | null;
  projectType?: string | null;
  budgetRange?: string | null;
  estimatedStartDate?: string | null;
  message: string;
  attachments?: string[];
  source?: string;
}

export async function sendInquiryNotificationEmail(data: InquiryEmailData) {
  const adminEmail = (process.env.ADMIN_EMAIL || "fanoonconsultants9@gmail.com").trim().toLowerCase();
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Fanoon Inquiries <onboarding@resend.dev>";
  const sourceLabel = data.source || "Website Inquiry";

  const attachmentsHtml = data.attachments && data.attachments.length > 0
    ? `
      <div style="background-color:#f0f7f3; border:1px dashed #169B62; padding:15px; border-radius:6px; margin-top:20px;">
        <div style="font-size:12px; font-weight:bold; color:#169B62; text-transform:uppercase; margin-bottom:8px;">
          &#128206; Attached Client Files (${data.attachments.length}):
        </div>
        ${data.attachments
          .map(
            (url, idx) =>
              `<div style="margin:4px 0;"><a href="${url}" target="_blank" style="color:#169B62; font-size:13px; text-decoration:underline;">View Attachment #${idx + 1} &rarr;</a></div>`
          )
          .join("")}
      </div>`
    : "";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Inquiry - ${data.name}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f5; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#222222;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f5; padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="650" cellpadding="0" cellspacing="0" style="max-width:650px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06); border:1px solid #eaeaea;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#0a0f0c; padding:35px 30px; text-align:left;">
              <div style="font-size:11px; font-weight:bold; letter-spacing:2px; color:#169B62; text-transform:uppercase; margin-bottom:8px;">
                NEW CLIENT INQUIRY &bull; ${sourceLabel.toUpperCase()}
              </div>
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:bold; line-height:1.2;">
                ${data.name} ${data.company ? `<span style="font-size:16px; font-weight:normal; color:#a0aab0;">(${data.company})</span>` : ""}
              </h1>
              <p style="color:#a0aab0; font-size:13px; margin:6px 0 0 0;">
                Submitted on ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:30px;">
              
              <!-- 1. Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td colspan="2" style="border-bottom:2px solid #169B62; padding-bottom:6px; margin-bottom:15px;">
                    <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#169B62; margin:0; font-weight:bold;">
                      1. Client Contact Details
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Client Name:</td>
                  <td style="padding:10px 0; font-size:14px; font-weight:600; color:#111111;">${data.name}</td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; width:40%; font-weight:bold; font-size:13px; color:#555555;">Email Address:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#169B62; font-weight:500;">
                    <a href="mailto:${data.email}" style="color:#169B62; text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Phone Number:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222;">
                    <a href="tel:${data.phone}" style="color:#222222; text-decoration:none; font-weight:500;">${data.phone}</a>
                  </td>
                </tr>` : ""}
                ${data.location ? `
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; width:40%; font-weight:bold; font-size:13px; color:#555555;">Location / City:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222; text-transform:capitalize;">${data.location}</td>
                </tr>` : ""}
                ${data.company ? `
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Company / Organization:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222;">${data.company}</td>
                </tr>` : ""}
              </table>

              <!-- 2. Project Scope & Specifications -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
                <tr>
                  <td colspan="2" style="border-bottom:2px solid #169B62; padding-bottom:6px; margin-bottom:15px;">
                    <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#169B62; margin:0; font-weight:bold;">
                      2. Project Scope & Details
                    </h2>
                  </td>
                </tr>
                ${data.service ? `
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Requested Service:</td>
                  <td style="padding:10px 0; font-size:14px; font-weight:600; color:#169B62;">${data.service}</td>
                </tr>` : ""}
                ${data.projectType ? `
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; width:40%; font-weight:bold; font-size:13px; color:#555555;">Project Category:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222; text-transform:capitalize;">${data.projectType}</td>
                </tr>` : ""}
                ${data.budgetRange ? `
                <tr>
                  <td style="padding:10px 0; width:40%; font-weight:bold; font-size:13px; color:#555555;">Budget Range:</td>
                  <td style="padding:10px 0; font-size:14px; color:#222222; font-weight:600;">${data.budgetRange}</td>
                </tr>` : ""}
                ${data.estimatedStartDate ? `
                <tr style="background-color:#fafafa;">
                  <td style="padding:10px 8px; width:40%; font-weight:bold; font-size:13px; color:#555555;">Estimated Start Timeline:</td>
                  <td style="padding:10px 8px; font-size:14px; color:#222222;">${data.estimatedStartDate}</td>
                </tr>` : ""}
              </table>

              <!-- 3. Message / Project Brief -->
              <div style="background-color:#f9fbf9; border-left:4px solid #169B62; padding:18px 20px; border-radius:4px; margin-bottom:20px;">
                <div style="font-size:12px; font-weight:bold; color:#169B62; text-transform:uppercase; margin-bottom:8px;">
                  Client Message / Project Brief:
                </div>
                <div style="font-size:14px; line-height:1.65; color:#222222; white-space:pre-line;">
                  ${data.message}
                </div>
              </div>

              ${attachmentsHtml}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa; border-top:1px solid #eeeeee; padding:20px 30px; text-align:center; font-size:12px; color:#888888;">
              This is an automated notification from the <strong>Fanoon Consultants Website</strong>.<br>
              To respond directly to this client, simply reply to <a href="mailto:${data.email}" style="color:#169B62;">${data.email}</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[RESEND_WARNING] RESEND_API_KEY is not set. Simulating inquiry email dispatch. Inquiry data:",
      {
        name: data.name,
        email: data.email,
        service: data.service,
        projectType: data.projectType,
        source: sourceLabel,
      }
    );
    return { success: true, simulated: true };
  }

  const resendClient = new Resend(apiKey);

  const isProjectQuery = Boolean(
    data.projectType ||
    data.budgetRange ||
    data.estimatedStartDate ||
    data.source?.toLowerCase().includes("project")
  );
  const subjectPrefix = isProjectQuery ? "New Project Query" : "New Client Inquiry";
  const subjectCategory = data.projectType || data.service || (isProjectQuery ? "Project Brief" : "General Inquiry");
  const subject = `${subjectPrefix}: ${data.name} - ${subjectCategory}`;

  const response = await resendClient.emails.send({
    from: fromEmail,
    to: adminEmail,
    replyTo: data.email,
    subject,
    html: htmlContent,
  });

  if (response.error) {
    console.error("[RESEND_INQUIRY_API_ERROR]", response.error);
    throw new Error(
      response.error.message || "Failed to send inquiry email via Resend API"
    );
  }

  return { success: true, response };
}


