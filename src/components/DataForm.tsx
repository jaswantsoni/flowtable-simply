import React, { useState } from "react";
import { toast } from "sonner";
import { FormData } from "@/types";

interface DataFormProps {
  onSubmit: (data: FormData) => void;
}

const DataForm = ({ onSubmit }: DataFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    campaign_id: 0,
    no_of_hits: 0,
  });

  const [errors, setErrors] = useState({
    campaign_id: "",
    no_of_hits: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
      const numValue = value === "" ? 0 : parseInt(value);
      setFormData({ ...formData, [name]: numValue });
    
    
    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      campaign_id: "",
      no_of_hits: "",
    };
    
    let isValid = true;

    // if (!formData.campaign_id.trim()) {
    //   newErrors.campaign_id = "Campaign ID is required";
    //   isValid = false;
    // } else if (!/^[A-Za-z0-9-]+$/.test(formData.campaign_id)) {
    //   newErrors.campaign_id = "Campaign ID can only contain letters, numbers, and hyphens";
    //   isValid = false;
    // }

    if (formData.no_of_hits <= 0) {
      newErrors.no_of_hits = "Number of hits must be greater than 0";
      isValid = false;
    } else if (formData.no_of_hits > 1000000) {
      newErrors.no_of_hits = "Number of hits cannot exceed 1,000,000";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      
      // Reset form after submission
      setFormData({
        campaign_id: 0,
        no_of_hits: 0,
      });
      
      toast.success("Data submitted successfully", {
        description: `Campaign ID: ${formData.campaign_id}, Hits: ${formData.no_of_hits}`,
      });
    }
  };

  return (
    <div className="form-container animate-fade-in">
      <div className="space-y-2 mb-6">
        <p className="text-xs text-muted-foreground">Form</p>
        <h2 className="text-xl font-medium tracking-tight">Submit Campaign Data</h2>
        <p className="text-sm text-muted-foreground">
          Enter campaign information to update analytics data
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="campaign_id" className="form-label">
              Campaign ID
            </label>
            <input
              type="number"
              id="campaign_id"
              name="campaign_id"
              className={`form-input ${errors.campaign_id ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
              value={formData.campaign_id==0 ? "" : formData.campaign_id}
              onChange={handleChange}
              placeholder="Enter campaign ID"
            />
            {errors.campaign_id && (
              <p className="mt-1 text-sm text-destructive">{errors.campaign_id}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="no_of_hits" className="form-label">
              Number of Hits
            </label>
            <input
              type="number"
              id="no_of_hits"
              name="no_of_hits"
              className={`form-input ${errors.no_of_hits ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
              value={formData.no_of_hits || ""}
              onChange={handleChange}
              placeholder="Enter number of hits"
              min="1"
            />
            {errors.no_of_hits && (
              <p className="mt-1 text-sm text-destructive">{errors.no_of_hits}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium 
                      bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 
                      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 
                      transition-all w-full md:w-auto"
          >
            Submit Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataForm;
