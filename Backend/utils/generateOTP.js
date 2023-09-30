const otpGenerator = require('otp-generator')
const gererateOTP = () => {
    const OTP = otpGenerator.generate(6, { specialChars: false });
    return OTP;
}

module.exports = gererateOTP;