"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";

export function ProfileForm({ 
  user_id, 
  initialData 
}: { 
  user_id: string, 
  initialData: any 
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [fullName, setFullName] = useState(initialData?.full_name || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar_url || "");
  const [instagram, setInstagram] = useState(initialData?.instagram_url || "");
  const [twitter, setTwitter] = useState(initialData?.twitter_url || "");

  // Update real-time image preview
  const publicAvatarUrl = avatarUrl 
    ? supabase.storage.from("user-uploads").getPublicUrl(avatarUrl).data.publicUrl
    : "/images/ugc_sample_lifestyle_1773196653983.png"; // Fallback image

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user_id,
        full_name: fullName,
        bio: bio,
        avatar_url: avatarUrl,
        instagram_url: instagram,
        twitter_url: twitter,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setMessage({ type: 'success', text: "Profile updated successfully!" });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      setMessage(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user_id}/avatar_${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("user-uploads")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      setAvatarUrl(data.path);
      
      // Auto-save the new avatar URL to DB
      await supabase.from("profiles").upsert({
        id: user_id,
        avatar_url: data.path,
        updated_at: new Date().toISOString(),
      });
      
      setMessage({ type: 'success', text: "Avatar uploaded successfully!" });
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message || "Error uploading image." });
      } else {
        setMessage({ type: 'error', text: "An unexpected error occurred." });
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="glass-dark p-8 rounded-3xl w-full max-w-2xl mx-auto border border-white/10 shadow-xl">
      <h2 className="text-3xl font-serif text-white mb-8">Edit Your Profile</h2>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={updateProfile} className="space-y-6">
        
        {/* Avatar Upload */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 rounded-2xl bg-white/5 border border-white/5">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/20">
            <Image 
              src={publicAvatarUrl} 
              alt="Avatar Configuration" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Label className="text-neutral-300 font-medium">Profile Image</Label>
            <div className="flex gap-4 items-center">
              <Button 
                type="button" 
                variant="outline" 
                className="relative bg-white/10 hover:bg-white/20 border-white/20"
                disabled={uploading}
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                {uploading ? "Uploading..." : "Upload new image"}
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
              </Button>
            </div>
            <p className="text-xs text-neutral-500">Recommended size: 500x500px. JPG, PNG, GIF allowed.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName" className="text-neutral-300">Display Name</Label>
            <Input 
              id="fullName" 
              value={fullName} 
              onChange={(e: any) => setFullName(e.target.value)} 
              placeholder="e.g. Ai Celle"
              className="bg-black/50 border-white/10 focus:border-pink-500/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio" className="text-neutral-300">Bio / About Me</Label>
            <Textarea 
              id="bio" 
              value={bio} 
              onChange={(e: any) => setBio(e.target.value)} 
              placeholder="Tell brands about your vibe, your audience, and your content style..."
              className="bg-black/50 border-white/10 focus:border-pink-500/50 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="instagram" className="text-neutral-300">Instagram URL</Label>
              <Input 
                id="instagram" 
                value={instagram} 
                onChange={(e: any) => setInstagram(e.target.value)} 
                placeholder="https://instagram.com/yourhandle"
                className="bg-black/50 border-white/10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter" className="text-neutral-300">Twitter/X URL</Label>
              <Input 
                id="twitter" 
                value={twitter} 
                onChange={(e: any) => setTwitter(e.target.value)} 
                placeholder="https://twitter.com/yourhandle"
                className="bg-black/50 border-white/10"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-white text-black hover:bg-neutral-200 mt-8 py-6 rounded-xl font-bold text-lg"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {loading ? "Saving Changes..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
}
