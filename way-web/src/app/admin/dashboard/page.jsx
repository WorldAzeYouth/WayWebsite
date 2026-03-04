"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("add");
  const [certs, setCerts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    project: "",
    issueDate: "",
    pdfUrl: "",
    reference: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (sidebarOpen && e.target.id === "sidebar-overlay") {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [sidebarOpen]);

  const fetchCertificates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "certificates"));
      const dataList = [];
      querySnapshot.forEach((doc) => {
        dataList.push({ ...doc.data(), docId: doc.id });
      });
      setCerts(dataList);
    } catch (err) {
      console.error("Məlumatlar çəkilərkən xəta:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isEditing) {
      await handleUpdate();
      return;
    }

    try {
      const lowercaseId = formData.id.trim().toLowerCase();
      const docRef = doc(db, "certificates", lowercaseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert(`❌ XƏTA: "${lowercaseId}" ID-si artıq mövcuddur!`);
        setLoading(false);
        return;
      }

      await setDoc(docRef, {
        id: lowercaseId,
        fullName: formData.fullName.trim().toLowerCase(),
        project: formData.project.trim().toLowerCase(),
        issueDate: formData.issueDate.trim().toLowerCase(),
        pdf: formData.pdfUrl.trim(),
        reference: formData.reference.trim(),
        createdAt: new Date().toISOString(),
      });

      alert("✅ Sertifikat uğurla əlavə edildi!");
      resetForm();
      fetchCertificates();
      setActiveTab("list");
    } catch (err) {
      console.error(err);
      alert("❌ Xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const lowercaseId = formData.id.trim().toLowerCase();
      const updateData = {
        fullName: formData.fullName.trim().toLowerCase(),
        project: formData.project.trim().toLowerCase(),
        issueDate: formData.issueDate.trim().toLowerCase(),
        pdf: formData.pdfUrl.trim(),
        reference: formData.reference.trim(), 
      };

      await updateDoc(doc(db, "certificates", lowercaseId), updateData);
      alert("✅ Məlumatlar uğurla yeniləndi!");
      resetForm();
      fetchCertificates();
      setActiveTab("list");
    } catch (err) {
      console.error("Yeniləmə xətası:", err);
      alert("❌ Yeniləmə zamanı xəta!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bu sertifikatı silməyə əminsiniz?")) return;
    try {
      await deleteDoc(doc(db, "certificates", id.trim().toLowerCase()));
      alert("✅ Sertifikat silindi!");
      fetchCertificates();
    } catch (err) {
      alert("❌ Silinmə zamanı xəta!");
    }
  };

  const startEdit = (cert) => {
    setFormData({
      id: cert.id,
      fullName: cert.fullName,
      project: cert.project,
      issueDate: cert.issueDate,
      pdfUrl: cert.pdf || "",
      reference: cert.reference || "", 
    });
    setIsEditing(true);
    setActiveTab("add");
    setSidebarOpen(false);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      fullName: "",
      project: "",
      issueDate: "",
      pdfUrl: "",
      reference: "",
    });
    setIsEditing(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    if (tab === "add" && !isEditing) resetForm();
    if (tab === "list") fetchCertificates();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex relative">
      {sidebarOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-30 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-8 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:shrink-0`}
      >
        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black italic text-blue-500">
              WAY ADMIN
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition p-1"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleTabChange("add")}
              className={`p-3 rounded-xl font-bold transition text-left ${activeTab === "add" ? "bg-blue-600" : "bg-slate-800 hover:bg-slate-700"}`}
            >
              {isEditing ? "Redaktə Et" : "Sertifikat Əlavə Et"}
            </button>
            <button
              onClick={() => handleTabChange("list")}
              className={`p-3 rounded-xl font-bold transition text-left ${activeTab === "list" ? "bg-blue-600" : "bg-slate-800 hover:bg-slate-700"}`}
            >
              Siyahıya Bax ({certs.length})
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6">
          <button
            onClick={() => router.push("/")}
            className="p-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center justify-center gap-2"
          >
            Ana Səhifə
          </button>
          <button
            onClick={() => {
              document.cookie = "admin_uid=; path=/; max-age=0;";
              router.push("/");
            }}
            className="p-3 rounded-xl font-bold bg-red-900/20 hover:bg-red-900/40 text-red-400 transition flex items-center justify-center gap-2"
          >
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-300 hover:text-white transition p-1"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-lg font-black italic text-blue-500">
            WAY ADMIN
          </span>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          {activeTab === "add" ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 mx-auto shadow-2xl"
            >
              <h1 className="text-xl sm:text-2xl font-bold mb-4">
                {isEditing ? "Sertifikatı Redaktə Et" : "Yeni Sertifikat"}
              </h1>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 pl-2">
                  Sertifikat ID
                </label>
                <input
                  className={`w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono text-blue-300 ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                  placeholder="way-001"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  required
                  disabled={isEditing}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 pl-2">
                  Ad Soyad
                </label>
                <input
                  className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="əli əliyev"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 pl-2">
                  Layihə Adı
                </label>
                <input
                  className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="təcrübə proqramı 2024"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 pl-2">
                  Verilmə Tarixi
                </label>
                <input
                  className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15 fevral 2024"
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-rose-400 pl-2">
                  Reference (Ürək sözləri)
                </label>
                <textarea
                  className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-rose-500 min-h-[120px] resize-none"
                  placeholder="Tələbə haqqında xoş sözlər..."
                  value={formData.reference}
                  onChange={(e) =>
                    setFormData({ ...formData, reference: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-xs font-bold text-emerald-400 pl-2">
                  Sertifikatın PDF Linki
                </label>
                <input
                  type="url"
                  className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-100"
                  placeholder="https://..."
                  value={formData.pdfUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, pdfUrl: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-black mt-4 transition-all uppercase flex justify-center items-center ${isEditing ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"} ${loading ? "opacity-70 cursor-wait" : ""}`}
              >
                {loading ? (
                  <span className="animate-pulse">YÜKLƏNİR...</span>
                ) : isEditing ? (
                  "Məlumatları Yenilə"
                ) : (
                  "Məlumatları Yadda Saxla"
                )}
              </button>

              {isEditing && (
                <button
                  onClick={resetForm}
                  type="button"
                  className="w-full text-slate-400 text-sm font-bold mt-2 hover:text-white transition-colors"
                >
                  Ləğv Et
                </button>
              )}
            </form>
          ) : (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-black">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Ad Soyad</th>
                      <th className="p-4">Layihə</th>
                      <th className="p-4 text-right">Əməliyyat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {certs.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-slate-800/20 transition"
                      >
                        <td className="p-4 font-mono text-blue-400">{c.id}</td>
                        <td className="p-4 font-bold uppercase">
                          {c.fullName}
                        </td>
                        <td className="p-4 text-slate-400 uppercase">
                          {c.project}
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => startEdit(c)}
                            className="text-blue-500 hover:bg-blue-500/10 px-3 py-1 rounded-lg font-bold text-xs transition-colors"
                          >
                            REDAKTƏ
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="text-red-500 hover:bg-red-500/10 px-3 py-1 rounded-lg font-bold text-xs transition-colors"
                          >
                            SİL
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {certs.length === 0 && (
                <p className="p-10 text-center text-slate-500 font-medium">
                  Sertifikat tapılmadı.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
