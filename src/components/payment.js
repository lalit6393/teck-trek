import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default async function displayRazorpay() {
  const token = localStorage.getItem("token");
  console.log(`-----------Razorpay---------`, token);
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  console.log(res);
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const result = await axios.get("http://localhost:8000/payment/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("RESULTS: ", result);
  if (!result) {
    alert("Server error. Are you online?");
    return;
  }

  const { key_id, amount, order_id, server_order_id } = result.data;

  const options = {
    key: key_id, // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: "INR",
    name: "Tech Trek",
    description: "TechTrek registration fees",
    order_id: order_id,
    handler: async function (response) {
      console.log(response);
      const data = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        server_order_id,
      };

      const result = await axios.post("http://localhost:8000/payment/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    },
    theme: {
      color: "#FD8D41",
      backdrop_color: "#231F2C",
    },
  };
  console.log("initiate payment");
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
