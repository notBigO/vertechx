import { space } from "@/app/layout";

import React from "react";

const RegistrationPage = async ({ params }: { params: any }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="container px-6 md:px-60 mx-auto flex flex-col gap-2 justify-start mt-10">
        <h1 className={`text-4xl md:text-5xl ${space.className} text-primary`}>
          Cyberbug - Debug the code challenge
        </h1>
      </div>
    </div>
  );
};

export default RegistrationPage;
