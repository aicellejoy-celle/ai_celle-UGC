import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

async function ProfileData() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    redirect("/auth/login");
  }

  // Fetch the user's profile data
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  return <ProfileForm user_id={authData.user.id} initialData={profileData || {}} />;
}

export default function ProfileSettingsPage() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-sm font-bold tracking-widest uppercase text-pink-400 mb-2">Dashboard</h1>
          <h2 className="text-4xl font-serif text-white">Profile Settings</h2>
        </div>
        <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <Suspense fallback={<div className="w-full h-96 glass-dark rounded-3xl animate-pulse"></div>}>
        <ProfileData />
      </Suspense>
    </div>
  );
}
