import { z } from "zod";

export const navigationFormSchema = z.object({
  name: z.string().min(1, {
    message: "Nazwa jest wymagana",
  }),
  link: z
    .string()
    .url({
      message: "Link musi być poprawnym adresem URL",
    })
    .or(z.literal("")),
});
