import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MultiStepProgressIndicator from '@/components/MultiStepProgressIndicator';
import IllustrationsComponent from '@/components/IllustrationsComponent';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const onboardingSteps = [
  { id: 1, name: "Account Setup" },
  { id: 2, name: "Identity Verification" },
  { id: 3, name: "Parental Consent" },
  { id: 4, name: "Preferences" },
  { id: 5, name: "Done" },
];

const step1Schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be YYYY-MM-DD"),
});

const step3Schema = z.object({
  parentEmail: z.string().email("Invalid parent email address"),
  consentAgreed: z.boolean().refine(val => val === true, { message: "Parental consent must be acknowledged" }),
});

const step4Schema = z.object({
  notificationsEnabled: z.boolean().default(false),
  newsletterSubscribed: z.boolean().default(false),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;

const OnboardingSequencePage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  // Initialize forms for each step
  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: { username: "", email: "", password: "" } });
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: { fullName: "", dob: "" } });
  const form3 = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: { parentEmail: "", consentAgreed: false } });
  const form4 = useForm<Step4Data>({ resolver: zodResolver(step4Schema), defaultValues: { notificationsEnabled: false, newsletterSubscribed: false } });

  console.log('OnboardingSequencePage loaded, current step:', currentStepIndex + 1);

  const handleNext = async () => {
    let isValid = false;
    let currentData = {};
    if (currentStepIndex === 0) {
      isValid = await form1.trigger();
      if(isValid) currentData = form1.getValues();
    } else if (currentStepIndex === 1) {
      isValid = await form2.trigger();
      if(isValid) currentData = form2.getValues();
    } else if (currentStepIndex === 2) {
      isValid = await form3.trigger();
      if(isValid) currentData = form3.getValues();
    } else if (currentStepIndex === 3) {
      isValid = await form4.trigger();
      if(isValid) currentData = form4.getValues();
    }

    if (isValid) {
      setFormData(prev => ({ ...prev, ...currentData }));
      if (currentStepIndex < onboardingSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmitAll = () => {
    console.log("Final Onboarding Data:", formData);
    // Here you would typically send formData to your backend
    setCurrentStepIndex(onboardingSteps.length -1); // Move to "Done" step
  }

  const renderStepContent = () => {
    switch (currentStepIndex) {
      case 0: // Account Setup
        return (
          <Form {...form1}>
            <form onSubmit={form1.handleSubmit(() => handleNext())} className="space-y-6">
              <FormField control={form1.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input placeholder="Choose a username" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form1.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form1.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" placeholder="Create a secure password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </form>
          </Form>
        );
      case 1: // Identity Verification
        return (
          <Form {...form2}>
            <form onSubmit={form2.handleSubmit(() => handleNext())} className="space-y-6">
              <IllustrationsComponent imageSrc="https://via.placeholder.com/300x150/E0F2FE/0EA5E9?text=Secure+Verification" altText="Identity Verification" title="Verify Your Identity" message="Please provide some basic information for KYC." imageClassName="max-w-[200px]"/>
              <FormField control={form2.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Legal Name</FormLabel>
                  <FormControl><Input placeholder="As shown on official documents" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form2.control} name="dob" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl><Input type="date" placeholder="YYYY-MM-DD" {...field} /></FormControl>
                  <FormDescription>We need this to verify your age.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            </form>
          </Form>
        );
      case 2: // Parental Consent
        return (
          <Form {...form3}>
            <form onSubmit={form3.handleSubmit(() => handleNext())} className="space-y-6">
              <IllustrationsComponent imageSrc="https://via.placeholder.com/300x150/FEF3C7/F59E0B?text=Parental+Consent" altText="Parental Consent" title="Parental Consent Required" message="Please have your parent/guardian review and provide their email." imageClassName="max-w-[200px]"/>
              <FormField control={form3.control} name="parentEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent/Guardian Email</FormLabel>
                  <FormControl><Input type="email" placeholder="parent.email@example.com" {...field} /></FormControl>
                  <FormDescription>We will send a confirmation to this email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form3.control} name="consentAgreed" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>My parent/guardian has consented to my use of this app.</FormLabel>
                    <FormDescription>Ensure you have their permission.</FormDescription>
                  </div>
                   <FormMessage />
                </FormItem>
              )} />
            </form>
          </Form>
        );
      case 3: // Preferences
        return (
          <Form {...form4}>
            <form onSubmit={form4.handleSubmit(() => handleNext())} className="space-y-6">
              <FormField control={form4.control} name="notificationsEnabled" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Notifications</FormLabel>
                    <FormDescription>Receive updates about your account and goals.</FormDescription>
                  </div>
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form4.control} name="newsletterSubscribed" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Subscribe to Newsletter</FormLabel>
                    <FormDescription>Get tips and news from us.</FormDescription>
                  </div>
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
            </form>
          </Form>
        );
      case 4: // Done
        return (
            <div className="text-center py-10">
                <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
                <h2 className="mt-6 text-2xl font-semibold">Setup Complete!</h2>
                <p className="mt-2 text-gray-600">Welcome aboard! You can now explore the app.</p>
                <Button className="mt-8" onClick={() => alert("Navigate to dashboard!")}>Go to Dashboard</Button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome! Let's Get You Started</CardTitle>
          <CardDescription>Follow these steps to create your account.</CardDescription>
          <div className="pt-6 pb-2">
            <MultiStepProgressIndicator
              steps={onboardingSteps}
              currentStepIndex={currentStepIndex}
              onStepClick={setCurrentStepIndex}
            />
          </div>
        </CardHeader>
        <ScrollArea className="h-[450px]"> {/* Adjust height as needed */}
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </ScrollArea>
        {currentStepIndex < onboardingSteps.length -1 && (
            <CardFooter className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStepIndex === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStepIndex < onboardingSteps.length - 2 ? (
                <Button onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : currentStepIndex === onboardingSteps.length - 2 ? (
                 <Button onClick={handleSubmitAll}>
                   Finish Setup <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
            ) : null}
            </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default OnboardingSequencePage;