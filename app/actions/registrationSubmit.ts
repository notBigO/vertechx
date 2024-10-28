"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/client";
import { createFormSchema } from "@/lib/formSchema";

export async function registrationSubmit(metadata: any, data: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(`/login?redirect=/register/${metadata.slug}`);
  }
  console.log(metadata);
  const registration = await prisma.registration.findFirst({
    where: {
      eventId: metadata.event.id,
      userId: session?.user?.id,
    },
  });
  console.log(registration);
  if (registration) {
    return {
      status: "error",
      message: "You have already registered for this event",
    };
  }

  const event = await prisma.event.findUnique({
    where: {
      id: metadata.event.id,
    },
  });

  console.log(event);

  if (!event) {
    return {
      status: "error",
      message: "You are trying to register for an invalid event",
    };
  }

  console.log(data);
  const formData = Object.fromEntries(data);
  if (event.isGroup) {
    formData.participants = JSON.parse(formData.participants);
  }
  const formSchema = createFormSchema(event);
  const parsed = formSchema.safeParse(formData);
  if (!parsed.success) {
    console.log(parsed.error);
    return {
      status: "error",
      message: "Invalid data",
    };
  }

  try {
    const screenshotFile = await data.get("screenshot");
    console.log(screenshotFile);
    const s3ObjectKey = crypto.randomUUID();

    const newRegistration = await prisma.registration.create({
      data: {
        eventId: event.id,
        userId: session?.user?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.contact,
        collegeName: formData.college,
        paymentId: formData.utrNumber,
        noOfParticipants: event.isGroup ? formData.participants.length : 0,
        participants: event.isGroup
          ? {
              create: formData.participants,
            }
          : undefined,
        paymentAmount: event.registrationFee,
        screenshotUrl: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${s3ObjectKey}`,
      },
      include: {
        participants: true,
        event: true,
      },
    });
    console.log(newRegistration);

    return {
      status: "success",
      message: "Registration submitted successfully",
      data: newRegistration,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error while submitting registration",
    };
  }
}
