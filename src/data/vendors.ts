export type Vendor = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  color: string; // tailwind gradient classes
  logoText: string;
  website: string;
  tariffUrl: string;
  trackUrl: string;
  layanan: string[];
};

// Semua vendor ekspedisi yang bekerja sama dengan A&H Express
export const VENDORS: Vendor[] = [
  {
    id: "jnt-express",
    name: "J&T Express",
    short: "J&T Express",
    tagline: "Express your online business",
    color: "from-red-500 to-red-700",
    logoText: "JT",
    website: "https://www.jet.co.id/",
    tariffUrl: "https://www.jet.co.id/rate",
    trackUrl: "https://www.jet.co.id/track",
    layanan: ["Reguler", "EZ", "Super Speed"],
  },
  {
    id: "wahana",
    name: "Wahana Express",
    short: "Wahana",
    tagline: "Solusi pengiriman ekonomis",
    color: "from-emerald-600 to-green-500",
    logoText: "WE",
    website: "https://www.wahana.com/",
    tariffUrl: "https://www.wahana.com/",
    trackUrl: "https://www.wahana.com/",
    layanan: ["Reguler", "Express"],
  },
  {
    id: "jne",
    name: "JNE Express",
    short: "JNE",
    tagline: "Connecting happiness",
    color: "from-blue-600 to-sky-500",
    logoText: "JN",
    website: "https://www.jne.co.id/",
    tariffUrl: "https://www.jne.co.id/id/tracking/tarif",
    trackUrl: "https://www.jne.co.id/id/tracking/trace",
    layanan: ["OKE", "REG", "YES", "JTR"],
  },
  {
    id: "pos",
    name: "POS Indonesia",
    short: "POS",
    tagline: "Layanan pos terpercaya",
    color: "from-orange-600 to-amber-600",
    logoText: "PI",
    website: "https://www.posindonesia.co.id/",
    tariffUrl: "https://www.posindonesia.co.id/id/check-tarif",
    trackUrl: "https://www.posindonesia.co.id/id/tracking",
    layanan: ["Pos Kilat Khusus", "Pos Express", "Pos Jumbo"],
  },
  {
    id: "tiki",
    name: "TIKI",
    short: "TIKI",
    tagline: "Titipan kilat terpercaya",
    color: "from-blue-700 to-indigo-600",
    logoText: "TK",
    website: "https://www.tiki.id/",
    tariffUrl: "https://www.tiki.id/id/tariff",
    trackUrl: "https://www.tiki.id/id/tracking",
    layanan: ["ECO", "REG", "ONS", "SDS"],
  },
  {
    id: "sicepat",
    name: "SiCepat Express",
    short: "SiCepat",
    tagline: "Ngirim jadi gampang",
    color: "from-rose-500 to-pink-600",
    logoText: "SC",
    website: "https://www.sicepat.com/",
    tariffUrl: "https://www.sicepat.com/checkPrice",
    trackUrl: "https://www.sicepat.com/checkAwb",
    layanan: ["REG", "BEST", "HALU", "GOKIL (Cargo)"],
  },
  {
    id: "sap",
    name: "SAP Express",
    short: "SAP",
    tagline: "Sentral Antar Paket",
    color: "from-amber-500 to-yellow-500",
    logoText: "SA",
    website: "https://sap-express.id/",
    tariffUrl: "https://sap-express.id/",
    trackUrl: "https://sap-express.id/tracking",
    layanan: ["Reguler", "SameDay", "Cargo"],
  },
  {
    id: "anteraja",
    name: "AnterAja",
    short: "AnterAja",
    tagline: "Antar paket lebih mudah",
    color: "from-cyan-500 to-teal-500",
    logoText: "AA",
    website: "https://anteraja.id/",
    tariffUrl: "https://anteraja.id/cek-tarif",
    trackUrl: "https://anteraja.id/tracking",
    layanan: ["Reguler", "Same Day", "Next Day", "Cargo"],
  },
  {
    id: "jnt-cargo",
    name: "J&T Cargo",
    short: "J&T Cargo",
    tagline: "Solusi pengiriman barang besar & berat",
    color: "from-red-600 to-rose-500",
    logoText: "JC",
    website: "https://www.jtcargo.id/",
    tariffUrl: "https://www.jtcargo.id/",
    trackUrl: "https://www.jtcargo.id/track",
    layanan: ["Reguler", "Express", "Heavy Cargo", "Sea Cargo"],
  },
  {
    id: "lion-parcel",
    name: "Lion Parcel",
    short: "Lion Parcel",
    tagline: "Kirim cepat ke seluruh Indonesia",
    color: "from-orange-500 to-amber-500",
    logoText: "LP",
    website: "https://lionparcel.com/",
    tariffUrl: "https://lionparcel.com/cek-tarif",
    trackUrl: "https://lionparcel.com/lacak-pengiriman",
    layanan: ["REGPACK", "ONEPACK", "BIGPACK", "JAGOPACK"],
  },
  {
    id: "ninja",
    name: "Ninja Express",
    short: "Ninja",
    tagline: "Pengiriman andal & terjangkau",
    color: "from-red-700 to-rose-700",
    logoText: "NX",
    website: "https://www.ninjaxpress.co/id-id",
    tariffUrl: "https://www.ninjaxpress.co/id-id/rates",
    trackUrl: "https://www.ninjaxpress.co/id-id/tracking",
    layanan: ["Reguler", "Same Day", "Next Day"],
  },
];

// Vendor untuk form pengiriman (semua vendor)
export const SHIPPING_VENDORS = VENDORS;

// Vendor untuk cek ongkir per kg (semua vendor)
export const TARIFF_VENDORS = VENDORS;

// Vendor untuk cek resi (semua vendor)
export const TRACK_VENDORS = VENDORS;

// Jenis layanan pengiriman A&H Express
export type DeliveryType = {
  id: string;
  name: string;
  desc: string;
  emoji: string;
};

export const DELIVERY_TYPES: DeliveryType[] = [
  { id: "door-to-door", name: "Door to Door", desc: "Dijemput dari alamat & diantar ke alamat penerima", emoji: "🏠➡️🏠" },
  { id: "door-to-port", name: "Door to Port", desc: "Dijemput dari alamat, diambil di port/cabang tujuan", emoji: "🏠➡️🏢" },
  { id: "port-to-door", name: "Port to Door", desc: "Diserahkan di port asal, diantar ke alamat penerima", emoji: "🏢➡️🏠" },
  { id: "port-to-port", name: "Port to Port", desc: "Diserahkan & diambil di port/cabang", emoji: "🏢➡️🏢" },
  { id: "pickup-drop", name: "Pick Up / Drop Point", desc: "Diambil/diserahkan di titik pickup atau drop point terdekat", emoji: "📍" },
];

// Nomor WhatsApp admin (format internasional tanpa +)
export const ADMIN_WHATSAPP = "6281234567890";
