import { NextResponse } from "next/server";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    console.log("Form Data on server: ", formData);

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const collegeName = formData.get("collegeName");
    const utrNumber = formData.get("utrNumber");
    const eventId = formData.get("eventId");
    const participantsJson = formData.get("participants");

    if (!name || !email || !phone || !collegeName || !utrNumber || !eventId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId: event.id,
        userId: session.user.id,
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You have already registered for this event" },
        { status: 400 }
      );
    }

    const file = formData.get("screenshot");
    if (!file) {
      return NextResponse.json(
        { error: "Payment screenshot is required" },
        { status: 400 }
      );
    }

    const fileExtension = file.type.split("/")[1];
    const fileName = `payment_screenshots/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExtension}`;

    const bytes = await file.arrayBuffer();
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(bytes),
      ACL: "public-read",
      ContentType: file.type,
    });

    await S3.send(uploadCommand);

    const screenshotUrl = `${process.env.R2_PUBLIC_BUCKET_URL}/${fileName}`;

    let participants = [];
    if (event.isGroup && participantsJson) {
      participants = JSON.parse(participantsJson);

      if (
        participants.length < event.minParticipants ||
        participants.length > event.maxParticipants
      ) {
        return NextResponse.json(
          { error: "Invalid number of participants" },
          { status: 400 }
        );
      }
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        collegeName,
        phone,
        userId: session.user.id,
        noOfParticipants: event.isGroup ? participants.length : 1,
        paymentAmount: event.registrationFee,
        paymentId: utrNumber,
        screenshotUrl,
        event: {
          connect: { id: event.id },
        },
        participants: event.isGroup
          ? {
              create: participants.map((p) => ({
                name: p.name,
                phone: p.phone,
              })),
            }
          : undefined,
      },
      include: {
        participants: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        registrationId: registration.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
