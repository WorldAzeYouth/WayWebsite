"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar/navbar";
import certificateImg from "@/../public/images/others/certificate_qr.jpg";
import { useTranslations } from "next-intl";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Dancing+Script:wght@600&family=Great+Vibes&display=swap');
    body{ background: #1C2143; }
    .font-outfit  { font-family: 'Outfit', sans-serif; }
    .font-jb      { font-family: 'JetBrains Mono', monospace; }
    .font-handwriting { font-family: 'Dancing Script', cursive; }
    .font-signature { font-family: 'Great Vibes', cursive; }
    
    .cert-bg {
      background: radial-gradient(ellipse 75% 45% at 8% 12%, rgba(30,110,230,0.20) 0%, transparent 58%), radial-gradient(ellipse 55% 55% at 94% 78%, rgba(19,74,143,0.25) 0%, transparent 55%), linear-gradient(170deg, #071020 0%, #0a1a35 18%, #0e2450 38%, #0f2d60 55%, #113672 70%, #134A8F 88%, #1e5ba8 100%);
    }
    .dot-grid { background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 28px 28px; }
    
    @keyframes bgPulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.18); } }
    @keyframes bgBounce { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-22px); } }
    @keyframes shimmerText { 0% { background-position: 0% center; } 100% { background-position: 300% center; } }
    .text-shimmer { background: linear-gradient(100deg, #60a5fa, #38bdf8, #93c5fd, #0ea5e9, #60a5fa); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmerText 4s linear infinite; }
    
    @keyframes floatImg { 0%, 100% { transform: translateY(0px) rotate(-1deg); } 50% { transform: translateY(-14px) rotate(-1deg); } }
    .float-img { animation: floatImg 7s ease-in-out infinite; }
    
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
    .fade-up.d1 { animation-delay: 0.10s; } .fade-up.d2 { animation-delay: 0.20s; } .fade-up.d3 { animation-delay: 0.30s; } .fade-up.d4 { animation-delay: 0.40s; } .fade-up.d5 { animation-delay: 0.55s; }
    
    @keyframes popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
    .pop-in { animation: popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
    
    .card-panel { position: relative; overflow: hidden; }
    .card-shadow { box-shadow: 0 0 0 1px rgba(56,189,248,0.10), 0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04); }
    .result-card { box-shadow: 0 20px 48px rgba(0,0,0,0.25), 0 0 0 1px rgba(14,165,233,0.18); }
    
    .letter-paper {
      background: #fff;
      background-image: linear-gradient(#f1f5f9 1px, transparent 1px);
      background-size: 100% 3rem;
      border-top: 10px solid #e11d48;
      box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
    }
    
    .heart-btn {
      transition: all 0.3s ease;
    }
    .heart-btn:hover {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px rgba(225, 29, 72, 0.4));
    }
  `}</style>
);

const IconX = () => (
  <svg
    className="w-8 h-8"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function Certificate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const tCert = useTranslations("certificate");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheck = () => {
    if (!certId.trim()) return;
    router.push(`${pathname}?id=${certId.trim().toLowerCase()}`);
  };

  useEffect(() => {
    const urlId = searchParams.get("id");
    if (!urlId) {
      setResult(null);
      setError(false);
      setCertId("");
      return;
    }
    setCertId(urlId);

    const fetchFromUrl = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "certificates", urlId.trim().toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResult(docSnap.data());
          setError(false);
        } else {
          setResult(null);
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFromUrl();
  }, [searchParams]);

  return (
    <>
      <GlobalStyles />
      <div className="cert-bg dot-grid font-outfit min-h-screen flex flex-col relative overflow-hidden">
        <Navbar />

        <main className="flex-grow px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 fade-up">
              <h1 className="font-outfit font-black text-white text-5xl md:text-6xl mb-5">
                {tCert("mainTitle")}
                <br />
                <span className="text-shimmer">{tCert("subTitle")}</span>
              </h1>
            </div>

            <div className="card-panel card-shadow rounded-[2rem] bg-gradient-to-br from-[#0c2040]/95 to-[#0e2f62]/90 flex flex-col lg:flex-row fade-up d2">
              <div className="flex-1 p-8 md:p-12 lg:p-16 relative z-10">
                <h2 className="text-white text-3xl font-black mb-8">
                  {tCert("title")}
                </h2>

                <div className="input-wrap relative mb-8">
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                    placeholder={tCert("placeholder")}
                    className="w-full pl-6 pr-[10rem] py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-sky-400/50 transition-all"
                  />
                  <button
                    onClick={handleCheck}
                    className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-sky-500 text-white font-bold cursor-pointer border-0"
                  >
                    {loading ? "..." : tCert("buttonText")}
                  </button>
                </div>

                {result && (
                  <div className="result-card pop-in bg-white rounded-2xl p-8 mt-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                      <div>
                        <h4 className="text-slate-800 font-black text-xl">
                          Sertifikat Rəsmi
                        </h4>
                        <span className="text-emerald-500 text-[10px] font-bold uppercase">
                          ● Orijinal Sertifikat
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {result.pdf && (
                          <button
                            onClick={() => window.open(result.pdf, "_blank")}
                            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                          >
                            ↓ Sertifikat
                          </button>
                        )}

                        <button
                          onClick={() => setShowLetter(true)}
                          className="heart-btn text-rose-500 hover:text-rose-600 cursor-pointer p-1"
                        >
                          <svg
                            className="w-7 h-7 fill-rose-500/10"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <p className="text-slate-400 text-[9px] font-bold uppercase mb-1">
                          Ad Soyad
                        </p>
                        <p className="text-slate-800 font-bold">
                          {result.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[9px] font-bold uppercase mb-1">
                          Verilmə Tarixi
                        </p>
                        <p className="text-slate-800 font-bold">
                          {result.issueDate}
                        </p>
                      </div>
                      <div className="col-span-2 pt-4 border-t">
                        <p className="text-slate-400 text-[9px] font-bold uppercase mb-1">
                          Proqram Adı
                        </p>
                        <p className="text-slate-800 font-bold">
                          {result.project}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && !loading && (
                  <div className="result-card pop-in bg-rose-50 border-l-8 border-rose-500 rounded-2xl p-8 mt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-rose-500 p-2 rounded-full text-white">
                        <IconX />
                      </div>
                      <div>
                        <h4 className="text-rose-900 font-black text-xl">
                          Sertifikat Tapılmadı!
                        </h4>
                        <p className="text-rose-700 text-sm font-medium mt-1">
                          "<span className="font-bold underline">{certId}</span>
                          " ID-li sertifikat bazada mövcud deyil. Zəhmət olmasa
                          ID-ni düzgün daxil etdiyinizə əmin olun.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center p-12">
                <div className="float-img relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={certificateImg}
                    alt="Certificate"
                    width={800}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {showLetter && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 md:p-10"
            onClick={() => setShowLetter(false)}
          >
            <div
              className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLetter(false)}
                className="absolute -top-12 right-0 text-white hover:text-rose-400 cursor-pointer transition-colors"
              >
                <IconX />
              </button>

              <div className="letter-paper w-full h-full rounded-xl p-8 md:p-20 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                  <div className="flex justify-between items-center mb-16 border-b pb-8">
                    <h3 className="font-outfit font-black text-2xl text-slate-900 tracking-tighter">
                      WAY ORGANIZATION
                    </h3>
                    <div className="font-signature text-3xl text-rose-600 rotate-12 border-2 border-rose-600 p-2 rounded-full w-30 h-30 flex items-center justify-center">
                      Reference
                    </div>
                  </div>

                  <div className="space-y-8">
                    <p className=" text-4xl text-slate-800 italic">
                      Əziz {result?.fullName},
                    </p>
                    <div className="font-outfit text-slate-700 text-xl md:text-2xl leading-relaxed italic whitespace-pre-line">
                      {result?.reference ? (
                        <p>{result.reference}</p>
                      ) : (
                        <>
                          <p>...</p>
                          <p className="mt-6 text-rose-600 font-bold">...</p>
                          <p className="mt-6">...</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-20 pt-10 border-t flex justify-end">
                    <div className="text-right">
                      <p className="font-jb text-rose-500 text-xs uppercase tracking-widest mb-2">
                        Hörmətlə,
                      </p>
                      <div className="font-signature text-5xl text-slate-800">
                        WAY Family
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
