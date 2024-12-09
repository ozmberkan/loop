import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Lütfen kullanıcı adını boş bırakmayınız!"),
  displayName: z.string().min(1, "Lütfen adınızı boş bırakmayınız!"),
  email: z.string().min(1, "Lütfen e-posta kısmını boş bırakmayınız!"),
  password: z.string().min(6, "Lütfen 6 karakterden fazla giriniz!"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Lütfen e-posta kısmını boş bırakmayınız!"),
  password: z.string().min(6, "Lütfen 6 karakterden fazla giriniz!"),
});
