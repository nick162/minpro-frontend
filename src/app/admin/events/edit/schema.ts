import * as Yup from "yup";

export const updateEventSchema = Yup.object().shape({
  eventName: Yup.string()
    .trim()
    .min(3, "Nama event minimal 3 karakter")
    .max(100, "Nama event maksimal 100 karakter")
    .optional(),

  description: Yup.string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter")
    .optional(),

  startDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("Format tanggal mulai tidak valid")
    .optional(),

  endDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("Format tanggal selesai tidak valid")
    .min(
      Yup.ref("startDate"),
      "Tanggal selesai tidak boleh sebelum tanggal mulai"
    )
    .optional(),

  thumbnail: Yup.mixed()
    .nullable()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 2 * 1024 * 1024;
      }
      return true;
    })
    .test("fileType", "Format gambar tidak didukung", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
      }
      return true;
    })
    .optional(),
});
