import { FiHome, FiUser, FiBell, FiMessageCircle } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";

export const UpperLinks = [
  { id: 1, to: "/", label: "Anasayfa", icon: FiHome },
  { id: 2, to: "/profile/ozmberkan", label: "Profilim", icon: FiUser },
  { id: 3, to: "/my-notifications", label: "Bildirimlerim", icon: FiBell },
  { id: 4, to: "/my-message", label: "Mesajlar", icon: FiMessageCircle },
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
