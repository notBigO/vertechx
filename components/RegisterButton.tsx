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
      className="bg-primary rounded-md p-3 text-center mt-4 w-full"
    >
      <span className="group-hover:decoration-2">REGISTER</span>
      <span className="group-hover:decoration-2">
        &#8377;
        {registrationFee}
      </span>
    </Link>
  );
};

export default RegisterButton;
