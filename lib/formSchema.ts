import { Event } from "@prisma/client";
import { z } from "zod";

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createFormSchema = (event?: Event) => {
  let schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    contact: z
      .string()
      .regex(/^[0-9]{10}$/, {
        message: "Contact number should be 10 digits and only contain numbers",
      })
      .min(1, { message: "Contact is required" })
      .max(10, { message: "Contact should be 10 digits" }),
    college: z.string().min(1, { message: "College is required" }),
    utrNumber: z.string().min(1, { message: "UTR Number is required" }),
    participants: z
      .array(
        z.object({
          name: z.string().min(1, { message: "Name is required" }),
          phone: z
            .string()
            .regex(/^[0-9]{10}$/, {
              message:
                "Contact number should be 10 digits and only contain numbers",
            })
            .min(1, { message: "Contact is required" })
            .max(10, { message: "Contact should be 10 digits" }),
        })
      )

      .refine(
        (participants) => {
          if (
            event?.minParticipants != null &&
            participants.length < event.minParticipants
          ) {
            return false;
          }
          if (
            event?.maxParticipants != null &&
            participants.length > event.maxParticipants
          ) {
            return false;
          }
          return true;
        },
        {
          message: `Number of participants should be between ${event?.minParticipants} and ${event?.maxParticipants}`,
        }
      ),
    screenshot: z
      .any()
      .refine((file) => file != null, { message: "Image is required." }),
  });

  // Modify the schema for non-group events
  if (event && !event.isGroup) {
    schema = schema.extend({
      participants: z.array().optional(),
    });
  }
  return schema;
};
