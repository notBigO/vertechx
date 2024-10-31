"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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

const EventRegistrationForm = ({ event, session, qr }) => {
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const [participantError, setParticipantError] = useState("");

  const form = useForm({
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      contact: "",
      college: "",
      utrNumber: "",
      screenshot: null,
      participants: event.isGroup ? [{ name: "", phone: "" }] : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  useEffect(() => {
    if (event.isGroup) {
      const participantCount = fields.length;
      if (participantCount < event.minParticipants) {
        setParticipantError(
          `Minimum ${event.minParticipants} participants required`
        );
      } else if (participantCount > event.maxParticipants) {
        setParticipantError(
          `Maximum ${event.maxParticipants} participants allowed`
        );
      } else {
        setParticipantError("");
      }
    }
  }, [fields, event.isGroup, event.minParticipants, event.maxParticipants]);

  const onSubmit = async (data) => {
    if (event.isGroup) {
      if (
        fields.length < event.minParticipants ||
        fields.length > event.maxParticipants
      ) {
        setParticipantError(
          `Team size must be between ${event.minParticipants} and ${event.maxParticipants} members`
        );
        return;
      }
    }
    console.log(data.screenshot);
    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.contact);
      formData.append("collegeName", data.college);

      formData.append("noOfParticipants", event.isGroup ? fields.length : 1);
      formData.append("utrNumber", data.utrNumber);
      formData.append("eventId", event.id);

      formData.append("screenshot", data.screenshot);
      // formData.append("category", event.category);

      if (event.isGroup) {
        formData.append("participants", JSON.stringify(data.participants));
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
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Event Registration</CardTitle>
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
                {/* Left Column - Personal Details */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Personal Details</h2>
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
                                className="text-white"
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
                                className="text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact"
                        rules={{ required: "Contact number is required" }}
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

                  {/* Team Members Section - Only shown for group events */}
                  {event.isGroup && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Team Members</h2>
                        <span className="text-sm text-muted-foreground">
                          {event.minParticipants}-{event.maxParticipants}{" "}
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
                          <Card key={field.id}>
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium">
                                  Team Member {index + 1}
                                </h3>
                                {fields.length > event.minParticipants && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
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

                        {fields.length < event.maxParticipants && (
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
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Payment Details</h2>
                    <Card>
                      <CardContent className="pt-6 space-y-6">
                        <div className="flex justify-center">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <img
                              src={qr.qr}
                              alt="Payment QR"
                              className="w-48 h-48"
                            />
                          </div>
                        </div>

                        <div className="text-center space-y-2">
                          <p className="text-muted-foreground">
                            Registration Fee
                          </p>
                          <p className="text-3xl font-medium">
                            ₹{event.registrationFee}
                          </p>
                          <Separator className="my-4" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              UPI ID
                            </p>
                            <p className="text-sm font-medium">
                              EzE0046709@CUB
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      Payment Verification
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="utrNumber"
                        rules={{ required: "UTR number is required" }}
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
                        rules={{ required: "Payment screenshot is required" }}
                        render={({ field: { onChange, ...field } }) => (
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
                                />
                                <Button
                                  asChild
                                  variant="outline"
                                  className="w-full"
                                >
                                  <label htmlFor="screenshot">
                                    <Upload className="mr-2 h-4 w-4" />
                                    {fileName || "Choose file"}
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

                {/* Submit Button */}
                <div className="lg:col-span-2 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary"
                    disabled={
                      status === "loading" ||
                      (event.isGroup && participantError)
                    }
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
