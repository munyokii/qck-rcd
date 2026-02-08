import { z } from "zod";

export const CompanyProfileSchema = z.object ({
  name: z.string().min(4, "Company name cannot be less than 4 characters"),
  kraPin: z.string().regex(/^[A-Z0-9]+$/, "Invalid KRA PIN format").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.email("Invalid email address"),
  website: z.url("Invalid URL").optional().or(z.literal("")),
  physicalAddress: z.string().min(5, "Address is too short"),
  logoUrl: z.string().optional().nullable(),
});

export type CompanyProfileValues = z.infer<typeof CompanyProfileSchema>;