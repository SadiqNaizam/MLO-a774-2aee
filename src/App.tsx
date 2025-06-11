import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly generated pages
import OnboardingSequencePage from "./pages/OnboardingSequencePage";
import MainDashboardPage from "./pages/MainDashboardPage";
import SavingsGoalsPage from "./pages/SavingsGoalsPage";
import SpendingActivityPage from "./pages/SpendingActivityPage";
import AccountProfilePage from "./pages/AccountProfilePage";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Define routes for the new pages */}
          {/* Onboarding might be a conditionally rendered route based on auth state,
              or the primary route for new users. For now, explicit path. */}
          <Route path="/onboarding" element={<OnboardingSequencePage />} />

          {/* MainDashboardPage can be the default authenticated route */}
          <Route path="/" element={<MainDashboardPage />} /> {/* Default to dashboard after login */}
          <Route path="/dashboard" element={<MainDashboardPage />} />


          <Route path="/savings-goals" element={<SavingsGoalsPage />} />
          <Route path="/spending-activity" element={<SpendingActivityPage />} />
          <Route path="/account-profile" element={<AccountProfilePage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;