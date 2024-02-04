import nodemailer from "nodemailer";

// Function to send an email
const sendEmail = async (subject, to, text) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2aa521221d889a",
      pass: "052a9fed1b15b8",
    },
  });

  // Setup email data
  const mailOptions = {
    from: '"Your Name" <your-email@example.com>', // Sender address
    // to: to, // List of recipients
    to: to, // List of recipients
    subject: subject, // Subject line
    text: text, // Plain text body
    // html: "<b>Hello world?</b>" // HTML body content (optional)
  };

  // Send email with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // Optionally, you can log the preview URL for testing purposes
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export { sendEmail };
