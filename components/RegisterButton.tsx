"use client";

import Link from "next/link";
import React from "react";

const RegisterButton = ({
  slug,
  registrationFee,
}: {
  slug: any;
  registrationFee: any;
}) => {
  return (
    <Link
      prefetch={false}
      href={`/register/${slug}`}
      // className="bg-gradient-to-br from-[#a96bb4] via-[#3b5e99] to-[#405585]  rounded-md p-3 text-center mt-4 w-full"
      className="bg-primary rounded-md p-3 text-center mt-4 w-full hover:bg-secondary transition"
    >
      <span>Register </span>
      <span>
        &#8377;
        {registrationFee}
      </span>
    </Link>
  );
};

export default RegisterButton;
