const crypto = require('crypto');

const generateOTP = (secretKey = '123', length = 6, algorithm = 'sha256') => {

    // Convert the secret key to a byte array.
    const secretKeyBytes = Buffer.from(secretKey, 'utf8');

    // Generate a random counter value.
    const counter = Math.floor(Math.random() * 1000000);

    // Generate a hash of the secret key and counter value.
    const hash = crypto.createHash(algorithm).update(secretKeyBytes).update(Buffer.from(counter.toString(), 'utf8')).digest('hex');

    // Extract the OTP from the hash.
    const otp = hash.substring(hash.length - length);
    console.log(otp);

    // Return the OTP.
    return otp;
}

module.exports = generateOTP;

































// const otpGenerator = require('otp-generator')
// const gererateOTP = () => {
//     const OTP = otpGenerator.generate(6, { specialChars: false });
//     return OTP;
// }

// module.exports = gererateOTP;