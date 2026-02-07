"use client";

import React from "react";
import { 
  X, Building2, ShieldCheck, Phone, Mail, Globe, MapPin, Camera 
} from "lucide-react";
import Button from "../Button";

interface ModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function BusinessProfileModal({ modalRef }: ModalProps) {
  const close = () => modalRef.current?.close();

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

        <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          <div className="w-full border-2 border-dashed border-primary/30 bg-primary/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-primary/10 hover:border-primary transition-all group">
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
            <input type="file" className="hidden" accept="image/png, image/jpeg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <FormInput 
              label="Company Registered Name *" 
              icon={Building2} 
              placeholder="e.g. Quick Records Ltd"
            />
            
            <FormInput 
              label="KRA PIN *" 
              icon={ShieldCheck} 
              placeholder="P000..." 
            />

            <FormInput 
              label="Official Phone *" 
              icon={Phone} 
              type="tel" 
              placeholder="+254 700 000 000"
            />

            <FormInput 
              label="Email Address *" 
              icon={Mail} 
              type="email" 
              placeholder="admin@company.com"
            />

            <FormInput 
              label="Website Address *" 
              icon={Globe} 
              type="url" 
              placeholder="https://example.com"
            />

            <div className="md:col-span-2">
               <FormTextArea 
                 label="Physical Location / Address *" 
                 icon={MapPin} 
                 placeholder={`123 Business Avenue, Suite 100\nGlobal City, GC 54321`}
               />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-base-200 flex justify-end gap-3 bg-base-200/30">
          <Button 
            variant="accent"
            className="mt-4"
            onClick={close}
          >
            Cancel
          </Button>
          
          <Button 
            variant="primary"
            className="mt-4"
            type="submit"
          >
            Update Profile & Branding
          </Button>
        </div>

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
}

const FormInput = ({ label, icon: Icon, className, ...props }: InputProps) => (
  <div className={`form-control gap-1.5 w-full ${className}`}>
    <label className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider ml-1">
      {label}
    </label>
    <label className="input input-bordered flex items-center gap-3 bg-base-200/50 border-base-300 focus-within:bg-base-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 h-12 rounded-xl">
      <Icon className="w-5 h-5 text-base-content/40" />
      <input 
        className="grow font-semibold text-base-content text-sm placeholder:text-base-content/20 placeholder:font-normal" 
        {...props} 
      />
    </label>
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon: React.ElementType;
}

const FormTextArea = ({ label, icon: Icon, className, ...props }: TextAreaProps) => (
  <div className={`form-control gap-1.5 w-full ${className}`}>
    <label className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute top-4 left-4 text-base-content/40 group-focus-within:text-primary transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <textarea 
        className="textarea textarea-bordered w-full pl-12 py-3.5 bg-base-200/50 border-base-300 focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/10 font-semibold text-base-content text-sm min-h-30 resize-none leading-relaxed rounded-xl transition-all duration-200"
        {...props}
      ></textarea>
    </div>
  </div>
);