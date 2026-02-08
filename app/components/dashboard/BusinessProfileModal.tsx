"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { 
  X, Building2, ShieldCheck, Phone, Mail, Globe, MapPin, Camera, Loader2 
} from "lucide-react";
import Button from "../Button";
import { CompanyProfileSchema, CompanyProfileValues } from "@/app/lib/schemas/company";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface ModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function BusinessProfileModal({ modalRef }: ModalProps) {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const close = () => modalRef.current?.close();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting },
    reset,
  } = useForm<CompanyProfileValues>({
    resolver: zodResolver(CompanyProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchProfile = async () => {

      setIsLoadingData(true);
      try {
        const res = await fetch("/api/company");
        const data = await res.json();

        if (data.company) {
          reset({
            name: data.company.name,
            kraPin: data.company.kraPin || "",
            phone: data.company.phone,
            email: data.company.email,
            website: data.company.website || "",
            physicalAddress: data.company.physicalAddress,
          });

          if (data.company.logoUrl) {
            setLogoPreview(data.company.logoUrl);
            setValue("logoUrl", data.company.logoUrl);
          }
        }
      } catch (error) {
        console.error("Failed to load profile", error);
        toast.error("Could not load current profile");
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchProfile();
  }, [reset, setValue]);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be smaller than 2MB");
        return;
      }

      try {
        const base64 = await convertToBase64(file);
        setLogoPreview(base64);
        setValue("logoUrl", base64, { shouldDirty: true });
      } catch (error) {
        console.error(error)
        toast.error("Error processing image");
      }
    }
  };

  const onSubmit = async (data: CompanyProfileValues) => {
    try {
      const payload = { ...data, logoUrl: logoPreview };

      const response = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Company profile updated!");
      router.refresh();
      close();
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error)
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-0 rounded-2xl overflow-hidden shadow-2xl">
        
        <div className="flex items-center justify-between p-6 border-b border-base-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-base-content leading-tight">
                Business Profile
              </h3>
              <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-0.5">
                Global PDF Branding Settings
              </p>
            </div>
          </div>
          <button 
            onClick={close} 
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:bg-base-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoadingData && (
            <div className="absolute inset-0 bg-base-100/50 z-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
            <div className="relative w-full border-2 border-dashed border-primary/30 bg-primary/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-primary/10 hover:border-primary transition-all group overflow-hidden">
              
              {/* File Input */}
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                accept="image/png, image/jpeg, image/webp"
                onChange={handleLogoChange}
              />

              {/* Preview Layer */}
              {logoPreview ? (
                  <div className="absolute inset-0 z-10 bg-base-100 flex items-center justify-center">
                      <Image 
                        src={logoPreview} 
                        alt="Logo Preview"
                        fill 
                        className="object-contain p-4" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                          Change Logo
                      </div>
                  </div>
              ) : (
                <>
                  <div className="w-14 h-14 bg-base-100 rounded-full shadow-sm border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-base-content text-sm group-hover:text-primary transition-colors">
                      UPLOAD BUSINESS LOGO
                    </p>
                    <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-wider">
                      JPG or PNG • Recommended Square
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <FormInput 
                label="Company Registered Name *" 
                icon={Building2} 
                placeholder="e.g. Quick Records Ltd"
                error={errors.name?.message}
                {...register("name")}
              />
              
              <FormInput 
                label="KRA PIN *" 
                icon={ShieldCheck} 
                placeholder="A000..."
                error={errors.kraPin?.message}
                {...register("kraPin")}
              />

              <FormInput 
                label="Official Phone *" 
                icon={Phone} 
                type="tel" 
                placeholder="0700 000 000"
                error={errors.phone?.message}
                {...register("phone")}
              />

              <FormInput 
                label="Email Address *" 
                icon={Mail} 
                type="email" 
                placeholder="admin@company.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <FormInput 
                label="Website Address *" 
                icon={Globe} 
                type="url" 
                placeholder="https://example.com"
                error={errors.website?.message}
                {...register("website")}
              />

              <div className="md:col-span-2">
                <FormTextArea 
                  label="Physical Location / Address *" 
                  icon={MapPin} 
                  placeholder={`123 Business Avenue, Suite 100\nGlobal City, GC 54321`}
                  error={errors.physicalAddress?.message}
                  {...register("physicalAddress")}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-base-200 flex justify-end gap-3 bg-base-200/30">
            <Button 
              variant="accent"
              // className="mt-4"
              type="button"
              disabled={isSubmitting}
              onClick={close}
            >
              Cancel
            </Button>
            
            <Button 
              variant="primary"
              className="min-w-37.5"
              type="submit"
              disabled={isSubmitting || isLoadingData}
            >
              {isSubmitting ? (
                  <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                  </>
              ) : "Update Profile"}
            </Button>
          </div>
        </form>

      </div>
      <form method="dialog" className="modal-backdrop bg-neutral-focus/40 backdrop-blur-[2px]">
        <button>close</button>
      </form>
    </dialog>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => (
    <div className={`form-control gap-1.5 w-full ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider ml-1">
            {label}
        </label>
        {error && <span className="text-[10px] text-error font-medium animate-pulse">{error}</span>}
      </div>
      
      <label className={`input input-bordered flex items-center gap-3 bg-base-200/50 border-base-300 focus-within:bg-base-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 h-12 rounded-xl ${error ? 'input-error bg-error/5' : ''}`}>
        <Icon className={`w-5 h-5 ${error ? 'text-error' : 'text-base-content/40'}`} />
        <input 
          ref={ref}
          className="grow font-semibold text-base-content text-sm placeholder:text-base-content/20 placeholder:font-normal" 
          {...props} 
        />
      </label>
    </div>
  )
);
FormInput.displayName = "FormInput";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon: React.ElementType;
  error?: string;
}

const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => (
    <div className={`form-control gap-1.5 w-full ${className}`}>
       <div className="flex justify-between items-center">
        <label className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider ml-1">
            {label}
        </label>
        {error && <span className="text-[10px] text-error font-medium animate-pulse">{error}</span>}
      </div>
      <div className="relative group">
        <div className={`absolute top-4 left-4 ${error ? 'text-error' : 'text-base-content/40'} group-focus-within:text-primary transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
        <textarea 
          ref={ref}
          className={`textarea textarea-bordered w-full pl-12 py-3.5 bg-base-200/50 border-base-300 focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/10 font-semibold text-base-content text-sm min-h-30 resize-none leading-relaxed rounded-xl transition-all duration-200 ${error ? 'textarea-error bg-error/5' : ''}`}
          {...props}
        ></textarea>
      </div>
    </div>
  )
);
FormTextArea.displayName = "FormTextArea";