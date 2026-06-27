import { useState } from "react";
import {
  SHIPPING_VENDORS,
  TARIFF_VENDORS,
  TRACK_VENDORS,
  DELIVERY_TYPES,
  type Vendor,
} from "./data/vendors";
import ShippingForm from "./components/ShippingForm";

type View = "home" | "kirim" | "form" | "ongkir" | "resi";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const goHome = () => {
    setView("home");
    setSelectedVendor(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onHome={goHome} />

      {view === "home" && <Home onNavigate={setView} />}

      {view === "kirim" && (
        <VendorSelect
          title="Pilih Ekspedisi Pengiriman"
          subtitle="Pilih jasa ekspedisi, lalu isi form pengiriman. Pesanan akan diteruskan ke WhatsApp admin."
          vendors={SHIPPING_VENDORS}
          onBack={goHome}
          onSelect={(v) => {
            setSelectedVendor(v);
            setView("form");
          }}
        />
      )}

      {view === "form" && selectedVendor && (
        <ShippingForm vendor={selectedVendor} onBack={() => setView("kirim")} />
      )}

      {view === "ongkir" && <CekOngkir onBack={goHome} />}

      {view === "resi" && <CekResi onBack={goHome} />}

      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <button onClick={onHome} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-lg">
            📦
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            A&amp;H<span className="text-emerald-500"> Express</span>
          </span>
        </button>
        <span className="hidden text-xs font-medium text-slate-400 sm:block">
          Jasa Pengiriman Multi Ekspedisi
        </span>
      </div>
    </header>
  );
}

/* ---------------- Home ---------------- */
function Home({ onNavigate }: { onNavigate: (v: View) => void }) {
  const features = [
    {
      id: "kirim" as View,
      emoji: "🚚",
      title: "Kirim Paket",
      desc: "Pilih ekspedisi, isi form, dan pesanan langsung diteruskan ke WhatsApp admin.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "ongkir" as View,
      emoji: "💰",
      title: "Cek Ongkir per Kg",
      desc: "Pilih ekspedisi untuk mengecek tarif ongkir terbaru langsung di website resminya.",
      color: "from-sky-500 to-blue-500",
    },
    {
      id: "resi" as View,
      emoji: "🔍",
      title: "Cek Resi",
      desc: "Lacak paket dari semua ekspedisi. Pilih vendor, langsung diarahkan ke halaman tracking resmi.",
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center text-white sm:py-24">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold backdrop-blur">
            Jasa Pengiriman Multi Ekspedisi
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
            A&amp;H Express — Satu Tempat untuk Semua Ekspedisi
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/90 sm:text-base">
            Bekerja sama dengan 11 vendor ekspedisi terbaik. Melayani Door to Door, Door to Port, Port to Door, Port to Port, hingga Pick Up / Drop Point. Pesan, cek ongkir & lacak resi dalam satu tempat.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate("kirim")}
              className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-emerald-600 shadow-lg transition hover:bg-emerald-50 active:scale-95"
            >
              🚚 Mulai Kirim Paket
            </button>
            <button
              onClick={() => onNavigate("resi")}
              className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
            >
              🔍 Lacak Resi
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto -mt-10 max-w-5xl px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => onNavigate(f.id)}
              className="group rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-2xl shadow-md`}>
                {f.emoji}
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{f.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                Pilih <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Delivery Types */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Layanan Pengiriman
        </p>
        <h2 className="mb-6 text-center text-2xl font-black">Pilihan Metode Pengiriman</h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DELIVERY_TYPES.map((d) => (
            <div key={d.id} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
              <div className="text-2xl">{d.emoji}</div>
              <p className="mt-2 text-sm font-bold">{d.name}</p>
              <p className="mt-1 text-xs text-slate-500">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor strip */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Ekspedisi Partner Kami
        </p>
        <h2 className="mb-6 text-center text-2xl font-black">11 Vendor Ekspedisi Terpercaya</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHIPPING_VENDORS.map((v) => (
            <div key={v.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-lg font-black text-white`}>
                {v.logoText}
              </div>
              <div className="min-w-0">
                <p className="font-bold">{v.name}</p>
                <p className="truncate text-sm text-slate-500">{v.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ---------------- Vendor Select (for kirim) ---------------- */
function VendorSelect({
  title,
  subtitle,
  vendors,
  onSelect,
  onBack,
}: {
  title: string;
  subtitle: string;
  vendors: Vendor[];
  onSelect: (v: Vendor) => void;
  onBack: () => void;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <BackButton onBack={onBack} />
      <h1 className="mt-4 text-2xl font-black sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">{subtitle}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="group overflow-hidden rounded-3xl border border-slate-100 bg-white text-left shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className={`bg-gradient-to-r ${v.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black backdrop-blur">
                  {v.logoText}
                </div>
                <span className="text-xl opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{v.name}</h3>
              <p className="text-sm text-white/85">{v.tagline}</p>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Layanan tersedia</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {v.layanan.map((l) => (
                  <span key={l} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

/* ---------------- Cek Ongkir ---------------- */
function CekOngkir({ onBack }: { onBack: () => void }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <BackButton onBack={onBack} />
      <h1 className="mt-4 text-2xl font-black sm:text-3xl">Cek Ongkir per Kg 💰</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        Pilih ekspedisi di bawah ini. Setelah dipilih, kamu akan diarahkan ke website resmi ekspedisi untuk mengecek tarif ongkir terbaru.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TARIFF_VENDORS.map((v) => (
          <a
            key={v.id}
            href={v.tariffUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${v.color} text-lg font-black text-white`}>
              {v.logoText}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold">{v.name}</p>
              <p className="truncate text-sm text-slate-500">Cek tarif ongkir resmi →</p>
            </div>
            <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500">↗</span>
          </a>
        ))}
      </div>

      <p className="mt-6 rounded-2xl bg-sky-50 p-4 text-sm text-sky-800">
        ℹ️ Tarif ongkir dihitung per kilogram dan dapat berbeda tergantung kota asal & tujuan. Cek langsung di website resmi untuk harga akurat.
      </p>
    </main>
  );
}

/* ---------------- Cek Resi ---------------- */
function CekResi({ onBack }: { onBack: () => void }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <BackButton onBack={onBack} />
      <h1 className="mt-4 text-2xl font-black sm:text-3xl">Cek Resi 🔍</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        Pilih ekspedisi tempat kamu mengirim paket. Setelah dipilih, kamu akan langsung diarahkan ke halaman lacak resi resmi vendor tersebut.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {TRACK_VENDORS.map((v) => (
          <a
            key={v.id}
            href={v.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-sm font-black text-white`}>
              {v.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <p className="text-sm font-semibold leading-tight">{v.name}</p>
            <span className="text-xs font-medium text-emerald-600">Lacak resi ↗</span>
          </a>
        ))}
      </div>

      <p className="mt-6 rounded-2xl bg-violet-50 p-4 text-sm text-violet-800">
        ✅ Kamu bisa mengecek resi dari semua ekspedisi di atas. Klik salah satu untuk membuka halaman tracking resmi.
      </p>
    </main>
  );
}

/* ---------------- Shared ---------------- */
function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
    >
      <span>←</span> Kembali ke Beranda
    </button>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-slate-400">
        <p className="font-bold text-slate-600">📦 A&amp;H Express</p>
        <p className="mt-1">Jasa pengiriman multi ekspedisi · Door to Door · Port to Port · Pick Up / Drop Point</p>
        <p className="mt-2 text-xs">© {new Date().getFullYear()} A&amp;H Express. Pesanan diproses via WhatsApp admin.</p>
      </div>
    </footer>
  );
}
