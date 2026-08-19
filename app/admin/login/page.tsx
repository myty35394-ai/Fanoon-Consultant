"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@fanoon.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password. Please try again.");
      } else {
        router.push("/admin");
      }
    } catch {
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b08] text-white flex flex-col lg:flex-row relative overflow-hidden font-sans">
      {/* Ambient Emerald Radial Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* ── LEFT SHOWCASE PANEL (Desktop) ────────────────────────── */}
      <div className="relative hidden lg:flex lg:w-7/12 flex-col justify-between p-12 lg:p-16 z-10 border-r border-white/10 overflow-hidden">
        {/* Background Architectural Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Fanoon Architecture Showcase"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          />
          {/* Dark Architectural Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b08] via-[#070b08]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b08] via-[#070b08]/40 to-transparent" />
          {/* Subtle Blueprint Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#169b62_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        {/* Top Branding Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="group inline-block">
            <Image
              src="/logo.png"
              alt="Fanoon Consultants"
              width={180}
              height={60}
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-white/90 font-semibold">System Online</span>
          </div>
        </div>

        {/* Middle Showcase Copy */}
        <div className="relative z-10 my-auto max-w-xl py-12">
          <span className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase block mb-4">
            ADMIN PORTAL
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Designing with Purpose<span className="text-primary">.</span><br />
            Building with Passion<span className="text-primary">.</span>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg">
            Access the centralized management console to curate portfolio projects, lead inquiries, dynamic team members, and operational data with precision.
          </p>

          {/* Quick Security Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/80 font-medium">Encrypted Authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/80 font-medium">Real-time Website Sync</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-6">
          <span>&copy; {new Date().getFullYear()} Fanoon Consultants.</span>
          <span>Architectural & Interior Consultancy</span>
        </div>
      </div>

      {/* ── RIGHT LOGIN FORM PANEL ──────────────────────────────── */}
      <div className="relative w-full lg:w-5/12 flex flex-col justify-between p-6 sm:p-10 lg:p-16 z-10 my-auto">
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between mb-8 pb-4 border-b border-white/10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Fanoon Consultants"
              width={150}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Website
          </Link>
        </div>

        {/* Back Link Desktop */}
        <div className="hidden lg:block mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>

        {/* Auth Card Container */}
        <div className="w-full max-w-md mx-auto my-auto">
          {/* Card Wrapper */}
          <div className="bg-[#121914]/90 border border-white/10 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top Green Line Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                ADMIN PORTAL
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sign In
              </h2>
              <p className="text-white/50 text-xs mt-1.5">
                Enter your admin credentials to manage your website.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed font-medium flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-[11px] font-bold text-white/70 uppercase tracking-widest mb-2">
                  Admin Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@fanoon.com"
                    className="w-full bg-[#18221b] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[11px] font-bold text-white/70 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#18221b] border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 mt-4 cursor-pointer active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN TO ADMIN PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Copyright for Mobile */}
        <div className="block lg:hidden text-center text-xs text-white/40 mt-8">
          &copy; {new Date().getFullYear()} Fanoon Consultants. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
