"use client";

import React, { useState, useEffect } from "react";
import { Plus, Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm, useFieldArray } from "react-hook-form";
import { Event } from "@prisma/client";

const EventRegistrationForm = ({ event, session, qr }: { event: Event }) => {
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const [participantError, setParticipantError] = useState("");
  const [isloading, setIsloading] = useState(false);

  // Account for registrant in participant counts
  const maxAdditionalMembers = Math.max(0, (event.maxParticipants || 1) - 1);
  const minAdditionalMembers = Math.max(0, (event.minParticipants || 1) - 1);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      contact: "",
      college: "",
      utrNumber: "",
      screenshot: null,
      participants: event.isGroup
        ? Array(minAdditionalMembers).fill({ name: "", phone: "" })
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const validateParticipants = () => {
    if (!event.isGroup) return "";

    // Include registrant in count
    const totalParticipants = fields.length + 1;

    if (totalParticipants < event.minParticipants) {
      return `Minimum ${event.minParticipants} participants required (including you)`;
    }
    if (totalParticipants > event.maxParticipants) {
      return `Maximum ${event.maxParticipants} participants allowed (including you)`;
    }

    const participantValues = form.getValues("participants");
    const emptyFields = participantValues.some(
      (field) => !field?.name?.trim() || !field?.phone?.trim()
    );
    if (emptyFields) {
      return "All participant details must be filled";
    }

    const invalidPhone = participantValues.some(
      (field) => !/^[0-9]{10}$/.test(field.phone)
    );
    if (invalidPhone) {
      return "All contact numbers must be 10 digits";
    }

    return "";
  };

  useEffect(() => {
    if (event.isGroup) {
      const error = validateParticipants();
      setParticipantError(error);
    }
  }, [form.watch("participants"), fields.length]);

  const onSubmit = async (data) => {
    if (event.isGroup) {
      const error = validateParticipants();
      if (error) {
        setParticipantError(error);
        return;
      }
    }

    setStatus("loading");
    setIsloading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.contact);
      formData.append("collegeName", data.college);
      formData.append(
        "noOfParticipants",
        event.isGroup ? fields.length + 1 : 1
      );
      formData.append("utrNumber", data.utrNumber);
      formData.append("eventId", event.id);
      formData.append("screenshot", data.screenshot);

      if (event.isGroup) {
        const allParticipants = [
          {
            name: data.name,
            phone: data.contact,
            isRegistrant: true,
          },
          ...data.participants.map((p) => ({
            ...p,
            isRegistrant: false,
          })),
        ];
        formData.append("participants", JSON.stringify(allParticipants));
      }

      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const result = await response.json();
      window.location.href = `/ticket/${result.registrationId}`;
      setIsloading(false);
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      setIsloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Event Registration
            </CardTitle>
            <CardDescription>
              Complete the form below to register for {event.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Left Column - Personal Details & Team Members */}
                <div className="space-y-8">
                  {/* Personal Details Section */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Personal Details
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled
                                className="bg-gray-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                disabled
                                className="bg-gray-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact"
                        rules={{
                          required: "Contact number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message:
                              "Please enter a valid 10-digit phone number",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+91 "
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="college"
                        rules={{ required: "College name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your college name"
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Team Members Section */}
                  {event.isGroup && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Additional Team Members
                        </h2>
                        <span className="text-sm text-gray-500">
                          Add {minAdditionalMembers}-{maxAdditionalMembers} more
                          members
                        </span>
                      </div>

                      {participantError && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {participantError}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <Card
                            key={field.id}
                            className="border border-gray-200"
                          >
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-900">
                                  Team Member {index + 1}
                                </h3>
                                {fields.length > minAdditionalMembers && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="text-gray-500 hover:text-red-500"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <div className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name={`participants.${index}.name`}
                                  rules={{
                                    required: "Member name is required",
                                  }}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter member's name"
                                          {...field}
                                          className="bg-white"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`participants.${index}.phone`}
                                  rules={{
                                    required: "Member contact is required",
                                    pattern: {
                                      value: /^[0-9]{10}$/,
                                      message:
                                        "Please enter a valid 10-digit phone number",
                                    },
                                  }}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Contact Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="tel"
                                          placeholder="+91 "
                                          {...field}
                                          className="bg-white"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {fields.length < maxAdditionalMembers && (
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => append({ name: "", phone: "" })}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Team Member
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Payment Details */}
                <div className="space-y-8">
                  {/* Payment Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Payment Details
                    </h2>
                    <Card className="border border-gray-200">
                      <CardContent className="pt-6 space-y-6">
                        <div className="flex justify-center">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <img
                              src={qr.qr}
                              alt="Payment QR Code"
                              className="w-48 h-48 object-contain"
                            />
                          </div>
                        </div>

                        <div className="text-center space-y-2">
                          <p className="text-gray-500">Registration Fee</p>
                          <p className="text-3xl font-medium text-gray-900">
                            ₹{event.registrationFee}
                          </p>
                          <Separator className="my-4" />
                          <div>
                            <p className="text-sm text-gray-500">UPI ID</p>
                            <p className="text-sm font-medium text-gray-900">
                              {qr.upiId || "EzE0046709@CUB"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payment Verification */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Payment Verification
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="utrNumber"
                        rules={{
                          required: "UTR number is required",
                          minLength: {
                            value: 8,
                            message: "UTR number must be at least 8 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UTR Number (Transaction ID)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter UTR number"
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="screenshot"
                        rules={{
                          required: "Payment screenshot is required",
                          validate: {
                            fileType: (value) => {
                              if (!value) return true;
                              const acceptedTypes = [
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                              ];
                              return (
                                acceptedTypes.includes(value.type) ||
                                "Please upload a valid image file (JPG, PNG)"
                              );
                            },
                            fileSize: (value) => {
                              if (!value) return true;
                              return (
                                value.size <= 5000000 ||
                                "File size must be less than 5MB"
                              );
                            },
                          },
                        }}
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Payment Screenshot</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setFileName(file?.name || "");
                                    onChange(file);
                                  }}
                                  className="hidden"
                                  id="screenshot"
                                  {...field}
                                />
                                <Button
                                  asChild
                                  variant="outline"
                                  className="w-full"
                                >
                                  <label
                                    htmlFor="screenshot"
                                    className="cursor-pointer"
                                  >
                                    <Upload className="mr-2 h-4 w-4" />
                                    {fileName || "Choose screenshot"}
                                  </label>
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary"
                    disabled={isloading}
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
