import {
  FiHome,
  FiUser,
  FiBell,
  FiMessageCircle,
  FiMail,
  FiLock,
} from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";

export const UpperLinks = [
  { id: 1, to: "/", label: "Anasayfa", icon: FiHome, id: "home" },
  {
    id: 2,
    to: "/my-account/ozmberkan",
    label: "Profilim",
    icon: FiUser,
    id: "profile",
  },
  {
    id: 3,
    to: "/my-notifications",
    label: "Bildirimlerim",
    icon: FiBell,
    id: "notifications",
  },
  {
    id: 4,
    to: "/my-messages",
    label: "Mesajlar",
    icon: FiMessageCircle,
    id: "messages",
  },
];

export const LowerLinks = [
  {
    id: 1,
    to: "/upgrade-to-pro",
    label: "Pro'ya Yükselt",
    icon: AiOutlineFire,
  },
  {
    id: 2,
    to: "/documents",
    label: "Dokümantasyon",
    icon: MdOutlineLibraryBooks,
  },
];

export const faqItems = [
  {
    question: "Diğer kullanıcıların içeriklerini görebilir miyim?",
    answer:
      "Evet! Kullanıcıların paylaştıkları içerikleri Anasayfa bölümünde görebilirsiniz. Ayrıca kullanıcıların profillerine giderek tüm içeriklerini inceleyebilirsiniz.",
  },
  {
    question: "Pro planına geçiş yapabilir miyim?",
    answer:
      "Kesinlikle! Profil sayfanızda yer alan Pro'ya Yükselt butonuna tıklayarak Pro planına geçiş yapabilirsiniz.",
  },
  {
    question: "Kullanıcılar ile iletişime geçebilir miyim?",
    answer:
      "Evet! Mesajlarım bölümünden diğer kullanıcılara mesaj gönderebilir ve alabilirsiniz.",
  },
  {
    question: "İade seçeneğiniz var mı?",
    answer: "Evet, pro planında 30 günlük para iade garantisi sunuyoruz.",
  },
  {
    question: "Kullanıcı desteği sağlıyor musunuz?",
    answer:
      "Evet, teknik sorunlar veya platform kullanımıyla ilgili her türlü konuda size yardımcı olmaya hazır bir destek ekibimiz var.",
  },
  {
    question: "Verilerim güvende mi?",
    answer:
      "Evet, verilerinizin güvenliği bizim önceliğimizdir. Tüm veriler endüstri standartlarına uygun olarak şifrelenir ve güvende tutulur.",
  },
  {
    question: "Birden fazla cihazda kullanabilir miyim?",
    answer:
      "Evet, hesabınızı aynı anda birden fazla cihazda kullanabilirsiniz. Tüm senkronizasyon otomatik olarak yapılır.",
  },
];

export const regInputs = [
  {
    id: 1,
    label: "Kullanıcı Adı",
    name: "username",
    icon: FiUser,
    type: "text",
    placeholder: "Kullanıcı adını giriniz...",
  },
  {
    id: 2,
    label: "Adın Soyadın",
    name: "displayName",
    icon: FiUser,
    type: "text",
    placeholder: "Adınızı soyadınızı giriniz...",
  },
  {
    id: 2,
    label: "E-Posta",
    name: "email",
    icon: FiMail,
    type: "email",
    placeholder: "E-Postanızı giriniz...",
  },
  {
    id: 3,
    label: "Parola",
    name: "password",
    icon: FiLock,
    type: "password",
    placeholder: "Parolanızı giriniz...",
  },
];

export const logInputs = [
  {
    id: 1,
    label: "E-Posta",
    name: "email",
    icon: FiMail,
    type: "email",
    placeholder: "E-Postanızı giriniz...",
  },
  {
    id: 2,
    label: "Parola",
    name: "password",
    icon: FiLock,
    type: "password",
    placeholder: "Parolanızı giriniz...",
  },
];
