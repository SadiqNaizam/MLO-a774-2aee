import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import CustomMenuItemList from '@/components/CustomMenuItemList';
import LearningModuleCard from '@/components/LearningModuleCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Shield, Bell, Users, BookOpen, HelpCircle, LogOut, Settings, Edit3, Lock, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const learningModules = [
  { id: "lm1", title: "Budgeting Basics 101", description: "Learn how to manage your money effectively.", duration: "10 min read", progress: 75, imageUrl: "https://via.placeholder.com/300x160/A7F3D0/059669?text=Budgeting", tags: ["Finance", "Beginner"] },
  { id: "lm2", title: "Understanding Savings", description: "Discover the power of saving and investing.", duration: "3 lessons", progress: 30, imageUrl: "https://via.placeholder.com/300x160/BAE6FD/0284C7?text=Savings", tags: ["Investing", "Tips"] },
];

const AccountProfilePage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userName, setUserName] = useState("Alex Junior");
  const [userEmail, setUserEmail] = useState("alex.junior@example.com");

  console.log('AccountProfilePage loaded');

  const profileMenuItems = [
    { id: "personal", label: "Personal Details", icon: <User size={18} />, action: () => setIsEditProfileOpen(true) },
    { id: "security", label: "Security & Password", icon: <Lock size={18} />, action: () => alert("Navigate to Security Settings") },
    { id: "notifications", label: "Notification Settings", icon: <Bell size={18} />, suffix: <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} id="notifications-switch"/> },
    { id: "parental", label: "Parental Controls", icon: <Users size={18} />, action: () => alert("Navigate to Parental Controls") },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} />, action: () => alert("Open Appearance Settings") },
  ];

  const helpMenuItems = [
      { id: "faq", label: "FAQs", icon: <HelpCircle size={18} />, action: () => alert("Show FAQs") },
      { id: "contact", label: "Contact Support", icon: <Settings size={18} />, action: () => alert("Open Contact Form") },
      { id: "privacy", label: "Privacy Policy", icon: <Shield size={18} />, action: () => alert("Show Privacy Policy") },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you'd typically update the user's profile via an API call
    console.log("Updated profile:", { userName, userEmail });
    setIsEditProfileOpen(false);
    alert("Profile updated!");
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header userName={userName} userAvatarUrl="https://placekitten.com/100/100" />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Profile Header */}
          <section className="flex flex-col items-center mb-8 p-6 bg-white rounded-xl shadow-lg">
            <Avatar className="w-24 h-24 mb-4 border-4 border-blue-500">
              <AvatarImage src="https://placekitten.com/200/200" alt={userName} />
              <AvatarFallback>{userName.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold text-gray-800">{userName}</h1>
            <p className="text-gray-500">{userEmail}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditProfileOpen(true)}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </section>

          {/* Account Settings */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Account Settings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <CustomMenuItemList items={profileMenuItems} itemClassName="hover:bg-slate-50" />
            </div>
          </section>

          {/* Educational Hub Teaser */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Learn & Grow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningModules.map(module => (
                <LearningModuleCard
                  key={module.id}
                  {...module}
                  onStartOrContinue={(id) => console.log('Start/Continue learning module:', id)}
                />
              ))}
            </div>
             <Button variant="link" className="mt-2 text-blue-600" onClick={() => alert("Navigate to full Educational Hub")}>
                View All Learning Modules <ArrowRight className="ml-1 h-4 w-4"/>
            </Button>
          </section>

          {/* Help & Support */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Help & Support</h2>
             <div className="bg-white rounded-lg shadow-md overflow-hidden">
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="px-4 hover:bg-slate-50">How do I reset my password?</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-gray-600">
                        You can reset your password from the login screen by clicking "Forgot Password". If you're logged in, go to Security settings.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="px-4 hover:bg-slate-50">Where can I see my transaction history?</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-gray-600">
                        Your full transaction history is available in the "Spending Activity" section of the app.
                        </AccordionContent>
                    </AccordionItem>
                 </Accordion>
                 <CustomMenuItemList items={helpMenuItems} className="border-t" itemClassName="hover:bg-slate-50" />
            </div>
          </section>

          {/* Logout Button */}
          <section className="text-center mt-10">
            <Button variant="destructive" size="lg" onClick={() => alert("Logging out...")}>
              <LogOut className="mr-2 h-5 w-5" /> Log Out
            </Button>
          </section>
        </main>
      </ScrollArea>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Profile</DialogTitle>
            <DialogDescription>Make changes to your personal information here.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate} className="space-y-4 py-2">
            <div>
                <Label htmlFor="edit-username">Username</Label>
                <Input id="edit-username" value={userName} onChange={(e) => setUserName(e.target.value)} className="mt-1" />
            </div>
            <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mt-1" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountProfilePage;