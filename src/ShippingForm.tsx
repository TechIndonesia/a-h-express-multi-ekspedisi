import { useState } from "react";
import type { Vendor } from "../data/vendors";
import { ADMIN_WHATSAPP, DELIVERY_TYPES } from "../data/vendors";

type Props = {
  vendor: Vendor;
  onBack: () => void;
};

type FormState = {
  namaPengirim: string;
  teleponPengirim: string;
  alamatPengirim: string;
  namaPenerima: string;
  teleponPenerima: string;
  alamatPenerima: string;
  kotaTujuan: string;
  layanan: string;
  jenisLayanan: string;
  jenisBarang: string;
  berat: string;
  catatan: string;
};

const initial: FormState = {
  namaPengirim: "",
  teleponPengirim: "",
  alamatPengirim: "",
  namaPenerima: "",
  teleponPenerima: "",
  alamatPenerima: "",
  kotaTujuan: "",
  layanan: "",
  jenisLayanan: DELIVERY_TYPES[0].name,
  jenisBarang: "",
  berat: "",
  catatan: "",
};

export default function ShippingForm({ vendor, onBack }: Props) {
  const [form, setForm] = useState<FormState>({ ...initial, layanan: vendor.layanan[0] });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const required: (keyof FormState)[] = [
    "namaPengirim",
    "teleponPengirim",
    "alamatPengirim",
    "namaPenerima",
    "teleponPenerima",
    "alamatPenerima",
    "kotaTujuan",
    "jenisBarang",
    "berat",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    required.forEach((key) => {
      if (!form[key].trim()) newErrors[key] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const lines = [
      `*PERMINTAAN PENGIRIMAN PAKET — A&H EXPRESS*`,
      `Ekspedisi: *${vendor.name}*`,
      `Jenis Layanan: ${form.jenisLayanan}`,
      `Layanan: ${form.layanan}`,
      ``,
      `*DATA PENGIRIM*`,
      `Nama: ${form.namaPengirim}`,
      `Telepon: ${form.teleponPengirim}`,
      `Alamat: ${form.alamatPengirim}`,
      ``,
      `*DATA PENERIMA*`,
      `Nama: ${form.namaPenerima}`,
      `Telepon: ${form.teleponPenerima}`,
      `Alamat: ${form.alamatPenerima}`,
      `Kota Tujuan: ${form.kotaTujuan}`,
      ``,
      `*DETAIL BARANG*`,
      `Jenis Barang: ${form.jenisBarang}`,
      `Berat: ${form.berat} kg`,
      form.catatan ? `Catatan: ${form.catatan}` : "",
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${text}`;
    window.open(url, "_blank");
  };

  const inputCls = (key: keyof FormState) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-offset-0 ${
      errors[key]
        ? "border-red-400 ring-2 ring-red-100"
        : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
    }`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
      >
        <span>←</span> Pilih ekspedisi lain
      </button>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
        <div className={`bg-gradient-to-r ${vendor.color} p-6 text-white`}>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black backdrop-blur">
              {vendor.logoText}
            </div>
            <div>
              <h2 className="text-xl font-bold">Form Pengiriman — {vendor.name}</h2>
              <p className="text-sm text-white/80">{vendor.tagline}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
          {/* Pengirim */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">1</span>
              Data Pengirim
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nama Pengirim" req error={errors.namaPengirim}>
                <input className={inputCls("namaPengirim")} data-error={errors.namaPengirim} value={form.namaPengirim} onChange={(e) => update("namaPengirim", e.target.value)} placeholder="Nama lengkap" />
              </Field>
              <Field label="No. Telepon" req error={errors.teleponPengirim}>
                <input className={inputCls("teleponPengirim")} data-error={errors.teleponPengirim} value={form.teleponPengirim} onChange={(e) => update("teleponPengirim", e.target.value)} placeholder="08xxxxxxxxxx" />
              </Field>
            </div>
            <Field label="Alamat Lengkap Pengirim" req error={errors.alamatPengirim}>
              <textarea rows={2} className={inputCls("alamatPengirim")} data-error={errors.alamatPengirim} value={form.alamatPengirim} onChange={(e) => update("alamatPengirim", e.target.value)} placeholder="Jalan, no rumah, kota, kode pos" />
            </Field>
          </section>

          {/* Penerima */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">2</span>
              Data Penerima
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nama Penerima" req error={errors.namaPenerima}>
                <input className={inputCls("namaPenerima")} data-error={errors.namaPenerima} value={form.namaPenerima} onChange={(e) => update("namaPenerima", e.target.value)} placeholder="Nama lengkap" />
              </Field>
              <Field label="No. Telepon" req error={errors.teleponPenerima}>
                <input className={inputCls("teleponPenerima")} data-error={errors.teleponPenerima} value={form.teleponPenerima} onChange={(e) => update("teleponPenerima", e.target.value)} placeholder="08xxxxxxxxxx" />
              </Field>
            </div>
            <Field label="Alamat Lengkap Penerima" req error={errors.alamatPenerima}>
              <textarea rows={2} className={inputCls("alamatPenerima")} data-error={errors.alamatPenerima} value={form.alamatPenerima} onChange={(e) => update("alamatPenerima", e.target.value)} placeholder="Jalan, no rumah, kode pos" />
            </Field>
            <Field label="Kota / Kabupaten Tujuan" req error={errors.kotaTujuan}>
              <input className={inputCls("kotaTujuan")} data-error={errors.kotaTujuan} value={form.kotaTujuan} onChange={(e) => update("kotaTujuan", e.target.value)} placeholder="Contoh: Surabaya" />
            </Field>
          </section>

          {/* Jenis Layanan Pengiriman */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">3</span>
              Jenis Layanan Pengiriman
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {DELIVERY_TYPES.map((d) => {
                const active = form.jenisLayanan === d.name;
                return (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => update("jenisLayanan", d.name)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="text-lg">{d.emoji}</span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">{d.name}</span>
                      <span className="block text-xs text-slate-500">{d.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Barang */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">4</span>
              Detail Barang
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Jenis Barang" req error={errors.jenisBarang}>
                <input className={inputCls("jenisBarang")} data-error={errors.jenisBarang} value={form.jenisBarang} onChange={(e) => update("jenisBarang", e.target.value)} placeholder="Contoh: Pakaian, dokumen" />
              </Field>
              <Field label="Berat (kg)" req error={errors.berat}>
                <input type="number" min="0" step="0.1" className={inputCls("berat")} data-error={errors.berat} value={form.berat} onChange={(e) => update("berat", e.target.value)} placeholder="1" />
              </Field>
            </div>
            <Field label="Pilih Layanan">
              <select className={inputCls("layanan")} value={form.layanan} onChange={(e) => update("layanan", e.target.value)}>
                {vendor.layanan.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Catatan (opsional)">
              <textarea rows={2} className={inputCls("catatan")} value={form.catatan} onChange={(e) => update("catatan", e.target.value)} placeholder="Instruksi tambahan untuk admin" />
            </Field>
          </section>

          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <p>Setelah mengisi form, pesanan akan dikirim ke <strong>WhatsApp admin</strong> untuk diproses. Admin akan mengonfirmasi ongkir & detail pengiriman.</p>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 active:scale-[0.99]"
          >
            <WhatsAppIcon /> Kirim Pesanan ke WhatsApp Admin
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  req,
  error,
  children,
}: {
  label: string;
  req?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {req && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">Wajib diisi</span>}
    </label>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.529 5.243l-.999 3.648 3.539-.939z" />
    </svg>
  );
}
