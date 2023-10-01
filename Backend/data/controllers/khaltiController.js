const axios = require('axios');
const asyncHandler = require('express-async-handler');

const verifyTransactions = asyncHandler(async (req, res) => {
    const token = req.body.payload.token;
    const amount = req.body.payload.amount;
    console.log(req.body)
    console.log(token, amount);
    let data = {
        "token": token,
        "amount": amount
    };

    let config = {
        headers: { 'Authorization': 'Key test_secret_key_38ed09e787904aa6827b1b62806981a7' }
    };

    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        .then(response => {
            console.log("Success Response");
            res.json(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error Response:");
            console.error(error);
        });

})


module.exports = {
    verifyTransactions,
};