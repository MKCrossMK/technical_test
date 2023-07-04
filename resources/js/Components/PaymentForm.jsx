import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

function PaymentForm({disabled}) {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            return;
        }

        Inertia.post("/cart/checkout", { paymentMethod: paymentMethod.id });
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded  font-bold w-full mt-3"
                disabled={disabled}
            >
                Realizar pago
            </button>
        </form>
    );
}

export default PaymentForm;
