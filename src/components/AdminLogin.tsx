import React, { useState } from 'react';
import { CanteenLogo } from './CanteenLogo';
import { loginAdmin } from '../services/canteenService';
import { isFirebaseConfigured } from '../firebase/config';

interface AdminLoginProps {
  onLoginSuccess: (email?: string) => void;
  onBackToStudent: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToStudent
}) => {
  const firebaseReady = isFirebaseConfigured();
  const [username, setUsername] = useState(firebaseReady ? '' : 'admin');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const result = await loginAdmin(username, password);
      if (result.success && result.isAdmin) {
        onLoginSuccess(result.userEmail);
      } else {
        setErrorMsg(result.errorMessage || 'Invalid credentials or unauthorized account.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillAdminDemo = () => {
    setUsername('admin@moderncoe.edu.in');
    setPassword('admin123');
    setErrorMsg(null);
  };

  const handleFillStudentDemo = () => {
    setUsername('student@moderncoe.edu.in');
    setPassword('student123');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen notice-board-cork py-8 px-4 flex items-center justify-center font-sans-rounded selection:bg-[#FFD166]">
      <div className="relative w-full max-w-md bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-3 border-[#1F2937] shadow-2xl overflow-hidden">
        
        {/* Top washi tape accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape rotate-1 border-t border-b border-amber-300 shadow-xs z-10" />

        {/* Header with Table Logo */}
        <div className="text-center pt-2 pb-5 border-b-2 border-dashed border-[#1F2937]/20">
          <div className="flex justify-center mb-3">
            <CanteenLogo size={80} showTagline={false} />
          </div>
          <div className="inline-block bg-[#1F2937] text-[#FFD166] px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5 shadow-2xs">
            🔒 Restricted Staff Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F2937] tracking-tight font-mono uppercase">
            Canteen Control Room
          </h1>
          <p className="font-handwriting text-base text-[#7C5CFF] font-bold mt-1">
            Menu management, tiffin updates & live queue dispatch
          </p>
        </div>

        {/* Firebase Architecture & Environment Status */}
        <div className="my-3 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-mono flex items-center justify-between">
          <span className="text-slate-600 font-bold">Authentication Mode:</span>
          {firebaseReady ? (
            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Firebase Auth (Production)
            </span>
          ) : (
            <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
              ⚡ Local Dev Mode (No Firebase)
            </span>
          )}
        </div>

        {/* Environment-Specific Notice: Production vs Local Dev */}
        {firebaseReady ? (
          <div className="my-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Firebase Real Authentication
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Admin UID Protected
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Sign in with your registered Firebase administrator email and password. Normal non-admin Firebase accounts will be rejected.
            </p>
          </div>
        ) : (
          <div className="my-3 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-900 block">
                Local Dev Controls (Firebase Not Connected)
              </span>
              <span className="text-[10px] text-amber-700 font-semibold">
                Offline Mode
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleFillAdminDemo}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] cursor-pointer transition-colors shadow-2xs"
              >
                Fill Admin Account
              </button>
              <button
                type="button"
                onClick={handleFillStudentDemo}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 font-bold text-[11px] cursor-pointer transition-colors shadow-2xs"
              >
                Test Student (Denied)
              </button>
            </div>
            <div className="text-[11px] text-slate-600">
              Admin: <span className="font-bold text-[#7C5CFF]">admin</span> • Pass: <span className="font-bold text-[#7C5CFF]">admin123</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-1">
              {firebaseReady ? 'Firebase Admin Email' : 'Admin Username / Email'}
            </label>
            <input
              id="admin-username-input"
              type={firebaseReady ? 'email' : 'text'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={firebaseReady ? 'admin@yourcanteen.com' : 'admin@moderncoe.edu.in'}
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white font-mono text-sm font-bold text-[#1F2937] focus:border-[#7C5CFF] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-1">
              Admin Password
            </label>
            <input
              id="admin-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white font-mono text-sm font-bold text-[#1F2937] focus:border-[#7C5CFF] focus:outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs font-mono font-bold flex items-start gap-2 shadow-xs">
              <span className="text-base leading-none">🚫</span>
              <div className="leading-snug break-words">
                {errorMsg}
              </div>
            </div>
          )}

          <button
            id="admin-login-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#1F2937] hover:bg-black text-[#FFD166] font-mono font-bold text-xs uppercase tracking-wider clay-button cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {isSubmitting
                ? 'Verifying Authorization...'
                : firebaseReady
                ? '🔑 Authenticate with Firebase'
                : '🔑 Unlock Canteen Control Room'}
            </span>
          </button>
        </form>

        {/* Navigation back to student portal */}
        <div className="mt-6 pt-4 border-t border-dashed border-slate-300 text-center">
          <button
            id="back-to-student-button"
            type="button"
            onClick={onBackToStudent}
            className="text-xs font-mono text-[#7C5CFF] hover:text-[#5a3ec8] font-bold inline-flex items-center gap-1.5 cursor-pointer underline"
          >
            <span>← Return to Student App</span>
          </button>
        </div>

      </div>
    </div>
  );
};
