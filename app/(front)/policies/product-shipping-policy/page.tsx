import React from "react";

const page = () => {
  return (
    <div className="w-[90%] mx-auto max-w-[600px] min-h-screen">
      <h1 className="text-4xl  text-center mt-10">Shipping Policies</h1>
      <p className="text-lg font-thin mt-5">
        Shipping Policy was last updated on 3rd February 2025 <br /> <br />{" "}
        Thank you for shopping at Medimetics <br /> <br />
      </p>
      <p className="text-lg font-thin">
        Please carefully review our Shipping & Delivery Policy when purchasing
        our products. This policy will apply to any order you place with us.
        <br />
        <br />
        <span className="font-semibold">
          {" "}
          Delivery timeline - 7 days
        </span>{" "}
        <br />
        <span className="font-semibold"> Delivery Charges - INR 100</span>
        <br />
        <br />
        For orders outside India
      </p>

      <p className="text-lg font-thin mt-4">
        <br />
        You can contact us by sending us an email:{" "}
        <span className="font-semibold"> liftlockbelts@gmail.com</span> or by
        calling on our support number :{" "}
        <span className="font-semibold">+91 90565 06403</span>
      </p>
    </div>
  );
};

export default page;
