import React, { useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";

const KhaltiPaymentComponent = ({ id, name, vid }) => {
    const auth = localStorage.getItem('user');
    const [idx, setId] = useState('');
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [paidAmt, setAmt] = useState('');
    const email_address = JSON.parse(auth).email;
    const handlePayment = () => {
        const config = {
            publicKey: "test_public_key_20ba6979112a4822bc3bdcb767d84dcf",
            productIdentity: `${vid}`,
            productName: `${name}`,
            productUrl: `http://localhost:3000/veiwbookingdetails/${id}`,
            eventHandler: {
                onSuccess: async (payload) => {
                    console.log(payload);
                    const result = await fetch("http://localhost:5000/api/khalti", {
                        method: 'post',
                        body: JSON.stringify({ payload }),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${JSON.parse(auth).token}`,
                        },
                    });
                    const resultData = await result.json();
                    console.log(resultData);
                    setAmt(resultData.amount);
                    setId(resultData.idx);
                    setToken(resultData.token);
                    setUser(resultData.user.name);
                    console.log(paidAmt, user, email_address, token, idx);

                    if (paidAmt !== '' || user !== '' || email_address !== '' || token !== '' || idx !== '') {
                        const paymentResult = { idx, email_address, paidAmt, user, token };
                        console.log(paymentResult);

                        const result = await fetch(`http://localhost:5000/api/booking/${id}/pay`, {
                            method: 'put',
                            body: JSON.stringify({ paymentResult }),
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${JSON.parse(auth).token}`,
                            },
                        });
                        const resultData = await result.json();
                        console.log(resultData);
                        if (resultData !== '') {
                            alert("Payment Successful !");
                        }

                    }

                    // setTimeout(() => {
                    //     console.log(paidAmt, user, email_address, token, idx);
                    // }, 4000);
                    // console.warn(resultData);
                    // console.log(resultData);

                },
                onError: (error) => {
                    console.log(error);
                },
                onClose: () => {
                    console.log("widget is closing");
                },
            },
            paymentPreference: ["KHALTI"],
        };

        const checkout = new KhaltiCheckout(config);
        checkout.show({ amount: 1000 });
    };

    return (
        <button id="payment-button " className="bg-red-500 rounded-2xl px-3 py-2 text-white" onClick={handlePayment}>
            Pay with Khalti
        </button>
    );
};

export default KhaltiPaymentComponent;
