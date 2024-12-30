const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");
const transporter = require("./nodemailer.config");

const sendVerificationEmail = async (email, verificationCode) => {
  try {
     await transporter.sendMail({
      from: '"Himanshu Dobariya 👻" <himanshudobariya4903@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify Your Email", // Subject line
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });
  } catch (error) {
    throw new Error(`Error sendig verification code: ${error}`);
  }
};

const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
  await transporter.sendMail({
      from: '"Himanshu Dobariya 👻" <himanshudobariya4903@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl), // html body
    });
  } catch (error) {
    throw new Error(`Error sendig reset password link : ${error}`);
  }
};

const sendSuccessResetPassWordEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: '"Himanshu Dobariya 👻" <himanshudobariya4903@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password Reset Sucessfully", // Subject line
      html: PASSWORD_RESET_SUCCESS_TEMPLATE, // html body
    });
  } catch (error) {
    throw new Error(
      `Error sendig email of password reset sucessfully : ${error}`
    );
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendSuccessResetPassWordEmail,
};
