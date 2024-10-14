import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { API_URL } from "../config";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function App() {
  const initialOptions = {
    "client-id": "YOUR_CLIENT_ID", // Remplace par ton vrai client ID
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // État de chargement

  return (
    <div className="App">
      {loading && <p>Chargement en cours...</p>} {/* Message de chargement */}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
          }}
          createOrder={async () => {
            setLoading(true); // Active le mode chargement
            try {
              const response = await fetch(`${ API_URL }/api/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart: [
                    {
                      id: "YOUR_PRODUCT_ID",
                      quantity: "YOUR_PRODUCT_QUANTITY",
                    },
                  ],
                }),
              });

              const orderData = await response.json();
              setLoading(false); // Désactive le mode chargement

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
              setLoading(false); // Désactive le mode chargement
            }
          }}
          onApprove={async (data, actions) => {
            setLoading(true); // Active le mode chargement
            try {
              const response = await fetch(
                `${ API_URL }/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const orderData = await response.json();
              setLoading(false); // Désactive le mode chargement

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
              setLoading(false); // Désactive le mode chargement
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default App;
