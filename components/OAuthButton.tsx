"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const OAuthButton = () => {
  return (
    <Button
      className="bg-primary hover:bg-secondary whitespace-nowrap text-base"
      onClick={() => signIn("google")}
    >
      Login to Register
    </Button>
  );
};

export default OAuthButton;
