import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Video, Smartphone, PenTool, Instagram, Twitter, Mail, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center overflow-x-hidden bg-background">
      
      {/* Navbar overlay */}
      <nav className="w-full fixed top-0 z-50 glass-dark border-b-0 h-20 flex justify-center backdrop-blur-md">
        <div className="w-full max-w-6xl flex justify-between items-center px-6 md:px-12 text-sm">
          <div className="font-semibold text-2xl tracking-tigher text-gradient-accent h-full flex items-center font-serif">
            Ai Celle
          </div>
          <div className="hidden md:flex gap-8 items-center text-neutral-300 font-medium tracking-wide">
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <div className="pl-4 border-l border-white/20 flex items-center h-8">
              <Suspense fallback={<div className="w-24 h-8 animate-pulse bg-white/10 rounded-md"></div>}>
                <AuthButton />
              </Suspense>
            </div>
            <Link href="#contact" className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-semibold">
              Work with me
            </Link>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/ugc_sample_lifestyle_1773196653983.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-30 md:opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        
        <div className="z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col items-center text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
            Captivating <br/><span className="text-gradient-accent">Content</span> Creation.
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-10 leading-relaxed font-light">
            I help modern brands tell their stories through authentic, aesthetic, and converting User-Generated Content.
          </p>
          <Link href="#portfolio" className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all text-white font-medium">
            View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-24 md:py-32 flex justify-center relative">
        <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden glass-dark border-white/5 p-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image 
                src="/images/ugc_sample_fashion_1773196685081.png" 
                alt="Ai Celle Portrait" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-pink-400">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Hi, I'm Celle.<br/> Your go-to UGC Creator.
            </h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Based in the vibrant heart of the creative industry, I specialize in producing highly-engaging, thumb-stopping short-form content. With an eye for modern aesthetics and a deep understanding of social algorithms, I bridge the gap between your brand and your audience.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed mb-4">
              Whether it's a seamless TikTok transition, a stunning Instagram Reel, or aesthetic product photography, I bring authentic energy that converts viewers into loyal customers.
            </p>
            
            <div className="flex gap-4">
              <div className="glass px-6 py-4 rounded-2xl flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">50+</span>
                <span className="text-sm text-neutral-400">Brands Trusted</span>
              </div>
              <div className="glass px-6 py-4 rounded-2xl flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">10M+</span>
                <span className="text-sm text-neutral-400">Views Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Types of Content */}
      <section id="services" className="w-full py-24 bg-neutral-900/50 flex justify-center border-y border-white/5">
        <div className="max-w-6xl w-full px-6 md:px-12 flex flex-col items-center">
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest uppercase text-pink-400 mb-4">What I Do</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Services & Content Types</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Service 1 */}
            <div className="glass-dark p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Video className="w-10 h-10 text-pink-300 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3">Short-Form Video</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">Engaging TikToks, Reels, and YouTube Shorts optimized for modern algorithms and viewer retention.</p>
            </div>
            
            {/* Service 2 */}
            <div className="glass-dark p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Camera className="w-10 h-10 text-purple-300 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3">Product Photography</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">Aesthetic, high-converting product shots in raw or edited formats perfectly lit for your campaigns.</p>
            </div>
            
            {/* Service 3 */}
            <div className="glass-dark p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Smartphone className="w-10 h-10 text-indigo-300 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3">Paid Ads (Spark Ads)</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">Direct response creative designed specifically for paid media featuring strong hooks and clear CTAs.</p>
            </div>
            
            {/* Service 4 */}
            <div className="glass-dark p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <PenTool className="w-10 h-10 text-neutral-300 mb-6" />
              <h4 className="text-xl font-bold text-white mb-3">Scripting & Ideation</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">Full concept development, trend analysis, and hook writing tailored to your brand's unique voice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Sample Works */}
      <section id="portfolio" className="w-full py-32 flex justify-center">
        <div className="max-w-6xl w-full px-6 md:px-12 flex flex-col">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-pink-400 mb-4">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white">Sample Works</h3>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white transition-colors pb-2 border-b border-transparent hover:border-white">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="group relative w-full h-[500px] rounded-3xl overflow-hidden cursor-pointer">
              <Image src="/images/ugc_sample_skincare_1773196669164.png" alt="Skincare Content" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="px-3 py-1 rounded-full glass text-xs font-medium text-white mb-3 inline-block">Skincare</span>
                <h4 className="text-2xl font-bold text-white">Aesthetic Product Flatlays</h4>
              </div>
            </div>

            <div className="group relative w-full h-[500px] rounded-3xl overflow-hidden cursor-pointer">
              <Image src="/images/ugc_sample_tech_1773196926367.png" alt="Tech Setup Content" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="px-3 py-1 rounded-full glass text-xs font-medium text-white mb-3 inline-block">Tech & Lifestyle</span>
                <h4 className="text-2xl font-bold text-white">Cozy Desk Setups & Unboxings</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Footer */}
      <footer id="contact" className="w-full relative py-32 flex justify-center border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/10 pointer-events-none" />
        </div>
        
        <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Ready to elevate your brand?</h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-xl">Let's collaborate to create stunning, engaging content that resonates with your audience and drives real results.</p>
          
          <a href="mailto:hello@aicelle.com" className="px-10 py-5 rounded-full bg-white text-black text-lg font-bold hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 mb-16">
            <Mail className="w-5 h-5" /> Let's Talk Content
          </a>

          <div className="flex gap-6 mt-12 border-t border-white/10 pt-12 w-full justify-center">
            <a href="#" className="p-4 rounded-full glass hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full glass hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <p className="mt-12 text-sm text-neutral-500 font-light">© 2026 Ai Celle UGC. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
