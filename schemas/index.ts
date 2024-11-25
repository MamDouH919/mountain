import * as z from "zod";
import i18n from 'i18next';

const fileSchema = z.instanceof(File, { message: i18n.language === "en" ? "Required" : "الملف مطلوب" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

export const AddHighlightsSchema = z.object({
  number: z.coerce.number({
    message: i18n.language === "en" ? "Allowed numbers only" : "الرقم المسموح به فقط",
  }),
  nameEn: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  nameAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
});

export const AddAvailableJobsSchema = z.object({
  jobNameEn: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  jobNameAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  available: z.boolean(),
});

export const addJobSchema = z.object({
  name: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  governorate: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  phone: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  jobName: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  email: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).email({
    message: i18n.language === "en" ? "must be a valid email" : "يجب أن يكون بريد إلكتروني صحيح",
  }),
  file: fileSchema.refine(file => file.size > 0 && file.size < 150 * 1024, i18n.language === "en" ? "File must be smaller than 200KB" : "يجب أن يكون الملف أصغر من 200 كيلوبايت")
})

// const fileSchema = z.instanceof(File, { message: i18n.language === "en" ? "Required" : "الملف مطلوب" })
export const AddNewsSchema = z.object({
  description: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  descriptionAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  title: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  titleAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  image: imageSchema.refine(file => file.size < 250 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت")
})

export const UpdateNewsSchema = AddNewsSchema.extend({
  image: imageSchema
    .optional()
    .refine(
      file => !file || (file.size < 150 * 1024 && file.size > 0), // Allow undefined, null, or empty string
      { message: i18n.language === "en" ? "File must be smaller than 150KB" : "يجب أن يكون الملف أصغر من 150 كيلوبايت" }
    )
})

export const AddBranchesSchema = z.object({
  name: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  nameAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  location: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  locationAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  mobile: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  whatsApp: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  gps: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  image: imageSchema.refine(file => file.size < 250 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت")
})

export const UpdateBranchesSchema = AddBranchesSchema.extend({
  image: imageSchema.optional(),
})

export const AddContactsSchema = z.object({
  name: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  email: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).email({
    message: i18n.language === "en" ? "must be a valid email" : "يجب أن يكون بريد إلكتروني صحيح",
  }),
  branch: z.string().nullable(),
  mobile: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  message: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
})

export const AddClientsSchema = z.object({
  name: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  nameAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),

  type: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  image: imageSchema.refine(file => file.size < 150 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 150KB" : "يجب أن يكون الملف أصغر من 150 كيلوبايت"),
})

export const UpdateClientsSchema = AddClientsSchema.extend({
  image: imageSchema
    .optional()
    .refine(
      file => !file || (file.size < 150 * 1024 && file.size > 0), // Allow undefined, null, or empty string
      { message: i18n.language === "en" ? "File must be smaller than 150KB" : "يجب أن يكون الملف أصغر من 150 كيلوبايت" }
    )
});

// const fileSchema = z.instanceof(File, { message: i18n.language === "en" ? "Required" : "الملف مطلوب" })
export const AddServicesSchema = z.object({
  description: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  descriptionAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  title: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  titleAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  videos: z.string().optional(),
  icon: imageSchema.refine(file => file.size < 10 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 10KB" : "يجب أن يكون الملف أصغر من 10 كيلوبايت"),
  // imgOne: imageSchema.refine(file => file.size < 250 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت"),
  // imgTwo: imageSchema.refine(file => file.size < 250 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت"),
  coverImg: imageSchema.refine(file => file.size < 250 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت"),
  // imgOne: fileSchema
  //   .refine(
  //     file => file && file.size < 250 * 1024 && file.size > 0,
  //     { message: i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت" }
  //   )
  //   .optional(),
  // imgTwo: fileSchema
  //   .refine(
  //     file => file && file.size < 250 * 1024 && file.size > 0,
  //     { message: i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت" }
  //   )
  //   .optional(),
  // imgThree: fileSchema
  //   .refine(
  //     file => file && file.size < 250 * 1024 && file.size > 0,
  //     { message: i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت" }
  //   )
  //   .optional()
})

export const UpdateServicesSchema = AddServicesSchema.extend({
  icon: imageSchema.refine(file => file.size < 10 * 1024, i18n.language === "en" ? "File must be smaller than 10KB" : "يجب أن يكون الملف أصغر من 10 كيلوبايت").optional(),
  coverImg: imageSchema.refine(file => file.size < 250 * 1024, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت").optional(),
})

export const ServicesImagesSchema = z.object({
  image: imageSchema.refine(file => file.size < 250 * 1024, i18n.language === "en" ? "File must be smaller than 10KB" : "يجب أن يكون الملف أصغر من 10 كيلوبايت"),
})

export const loginSchema = z.object({
  email: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).email({
    message: i18n.language === "en" ? "must be a valid email" : "يجب أن يكون بريد إلكتروني صحيح",
  }),
  password: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  })
})