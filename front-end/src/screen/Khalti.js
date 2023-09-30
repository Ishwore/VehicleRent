import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
// import axios from "axios";

const KhaltiPaymentComponent = ({ id, name, vid }) => {
    // const verify = async (payload) => {
    //     let data = {
    //         "token": payload.token,
    //         "amount": payload.amount
    //     };

    //     let configs = {
    //         headers: { 'Authorization': 'Key test_secret_key_5718c104157c4cea8676a8681a53ace8' }
    //     };
    //     let apturl = "https://khalti.com/api/v2/payment/status/"
    //     axios.get(apturl, data, configs)
    //         .then(response => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     // const response = await axios.post(`https://khalti.com/api/v2/payment/verify/`, data, configs);
    //     // const result = await response.json();
    //     // console.log(result);
    // }

    const handlePayment = () => {
        const config = {
            publicKey: "test_public_key_20ba6979112a4822bc3bdcb767d84dcf",
            productIdentity: `${vid}`,
            productName: `${name}`,
            productUrl: `http://localhost:3000/veiwbookingdetails/${id}`,
            eventHandler: {
                onSuccess: (payload) => {
                    // hit merchant api for initiating verification
                    console.log(payload);
                    // verify(payload);


                    // axios.get("https://khalti.com/api/v2/payment/status/", data, configs)
                    //     .then(response => {
                    //         console.log(response.data);
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });

                },
                onError: (error) => {
                    // handle errors
                    console.log(error);
                },
                onClose: () => {
                    console.log("widget is closing");
                },
            },
            paymentPreference: ["KHALTI"],
        };

        const checkout = new KhaltiCheckout(config);
        // minimum transaction amount must be 10, i.e., 1000 in paisa.
        checkout.show({ amount: 10000 });
    };

    return (
        <button id="payment-button " className="bg-red-500 rounded-2xl px-3 py-2 text-white" onClick={handlePayment}>
            Pay with Khalti
        </button>
    );
};

export default KhaltiPaymentComponent;
