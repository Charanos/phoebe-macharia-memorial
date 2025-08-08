"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Camera,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Users,
  Tag,
  FileText,
  Check,
  AlertCircle,
  Trash2,
  Eye,
  Sparkles,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "../ui/toast";

interface PhotoSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  people: string[];
  isPrivate: boolean;
  submitterName: string;
  submitterEmail: string;
  submitterRelation: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

const PhotoSubmissionForm: React.FC<PhotoSubmissionFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    people: [],
    isPrivate: false,
    submitterName: "",
    submitterEmail: "",
    submitterRelation: "",
  });

  const categories = [
    { id: "family", label: "Family", icon: Users, color: "text-blue-500" },
    {
      id: "childhood",
      label: "Childhood",
      icon: Sparkles,
      color: "text-pink-500",
    },
    {
      id: "school",
      label: "School Days",
      icon: FileText,
      color: "text-green-500",
    },
    { id: "work", label: "Work Life", icon: Tag, color: "text-purple-500" },
    {
      id: "memories",
      label: "Special Memories",
      icon: Camera,
      color: "text-amber-500",
    },
    { id: "nature", label: "Nature", icon: MapPin, color: "text-emerald-500" },
  ];

  const relationships = [
    "Family Member",
    "Close Friend",
    "Friend",
    "Colleague",
    "Neighbor",
    "Church Member",
    "Community Member",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePeopleChange = (value: string) => {
    const people = value
      .split(",")
      .map((person) => person.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, people }));
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        showToast({
          type: "error",
          title: "Invalid File",
          message: `${file.name} is not a valid image file.`,
        });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        showToast({
          type: "error",
          title: "File Too Large",
          message: `${file.name} is larger than 10MB.`,
        });
        return false;
      }
      return true;
    });

    const newFiles: UploadedFile[] = [];

    for (const file of validFiles) {
      const preview = URL.createObjectURL(file);
      const id = Math.random().toString(36).substring(7);
      newFiles.push({ file, preview, id });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    if (newFiles.length > 0) {
      showToast({
        type: "success",
        title: "Files Added",
        message: `${newFiles.length} photo${
          newFiles.length > 1 ? "s" : ""
        } ready for upload.`,
      });
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      showToast({
        type: "error",
        title: "No Photos",
        message: "Please select at least one photo to submit.",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add files
      uploadedFiles.forEach((uploadedFile, index) => {
        submitData.append(`photos`, uploadedFile.file);
      });

      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, String(value));
        }
      });

      const response = await fetch("/api/gallery/submit", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        showToast({
          type: "success",
          title: "Photos Submitted!",
          message:
            "Your photos have been submitted for review. Thank you for sharing!",
        });

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          date: "",
          location: "",
          people: [],
          isPrivate: false,
          submitterName: "",
          submitterEmail: "",
          submitterRelation: "",
        });
        setUploadedFiles([]);
        setStep(1);

        if (onSuccess) onSuccess();
        onClose();
      } else {
        throw new Error(result.message || "Failed to submit photos");
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Submission Failed",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while submitting your photos.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && uploadedFiles.length === 0) {
      showToast({
        type: "error",
        title: "No Photos Selected",
        message: "Please select at least one photo before continuing.",
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="glass p-2 rounded-full">
                <Camera className="h-5 w-5 text-accent-primary" />
              </div>
              <h2 className="text-2xl font-headings font-semibold text-text-primary">
                Share Your Photos
              </h2>
            </div>
            <button
              onClick={onClose}
              className="glass p-2 rounded-full hover:text-accent-primary transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex items-center space-x-4 mb-6">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-headings font-medium transition-all duration-300 ${
                      stepNumber <= step
                        ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                        : "glass text-text-secondary"
                    }`}
                  >
                    {stepNumber < step ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-16 h-1 rounded-full transition-all duration-300 ${
                        stepNumber < step
                          ? "bg-gradient-to-r from-accent-primary to-accent-secondary"
                          : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm font-body text-text-secondary mb-6">
              <span className={step === 1 ? "text-accent-primary" : ""}>
                Upload Photos
              </span>
              <span className={step === 2 ? "text-accent-primary" : ""}>
                Photo Details
              </span>
              <span className={step === 3 ? "text-accent-primary" : ""}>
                Your Information
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: File Upload */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    dragActive
                      ? "border-accent-primary bg-accent-primary/5"
                      : "border-white/20 hover:border-accent-primary/50 hover:bg-accent-primary/5"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="glass p-4 rounded-full w-fit mx-auto mb-4">
                    <Upload className="h-8 w-8 text-accent-primary" />
                  </div>
                  <h3 className="text-xl font-headings font-medium text-text-primary mb-2">
                    Drop your photos here
                  </h3>
                  <p className="text-text-secondary font-body mb-4">
                    or click to browse your device
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                    <span>Supports: JPG, PNG, GIF</span>
                    <span>•</span>
                    <span>Max 10MB per file</span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>

                {/* Preview Grid */}
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                      {uploadedFiles.map((file) => (
                        <motion.div
                          key={file.id}
                          className="relative group glass-card p-2 hover:scale-[1.02] transition-transform duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <div className="relative aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={file.preview}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(file.id);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>

                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-xs font-body text-white bg-black/50 rounded px-2 py-1 truncate">
                              {file.file.name}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Photo Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Give your photo a meaningful title"
                      className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Date Taken
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="glass w-full pl-10 pr-4 py-3 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Share the story behind this photo, what made this moment special?"
                    className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-3">
                    Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              category: category.id,
                            }))
                          }
                          className={`glass-button p-4 text-left transition-all duration-300 ${
                            formData.category === category.id
                              ? "text-accent-primary border-accent-primary/30 bg-accent-primary/10"
                              : "text-text-secondary hover:text-accent-primary hover:border-accent-primary/20"
                          }`}
                        >
                          <Icon className={`h-5 w-5 mb-2 ${category.color}`} />
                          <div className="font-headings font-medium text-sm">
                            {category.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Where was this photo taken?"
                        className="glass w-full pl-10 pr-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      People in Photo
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                      <input
                        type="text"
                        value={formData.people.join(", ")}
                        onChange={(e) => handlePeopleChange(e.target.value)}
                        placeholder="Names of people (comma separated)"
                        className="glass w-full pl-10 pr-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-accent-primary bg-transparent border-2 border-accent-primary/30 rounded focus:ring-accent-primary focus:ring-2"
                  />
                  <label
                    htmlFor="isPrivate"
                    className="text-sm font-body text-text-secondary"
                  >
                    Keep this photo private (only visible to family members)
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 3: Submitter Information */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="submitterName"
                      value={formData.submitterName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="submitterEmail"
                      value={formData.submitterEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                    Your Relationship to Phoebe *
                  </label>
                  <select
                    name="submitterRelation"
                    value={formData.submitterRelation}
                    onChange={handleInputChange}
                    required
                    className="glass w-full px-4 py-3 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                  >
                    <option value="">Select your relationship</option>
                    {relationships.map((relation) => (
                      <option key={relation} value={relation}>
                        {relation}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="glass-card p-6 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 border border-accent-primary/20">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-accent-primary mt-0.5" />
                    <div>
                      <h4 className="font-headings font-medium text-text-primary mb-2">
                        Submission Guidelines
                      </h4>
                      <ul className="text-sm text-text-secondary font-body space-y-1">
                        <li>
                          • Photos will be reviewed before being published
                        </li>
                        <li>
                          • Only appropriate, respectful content will be
                          approved
                        </li>
                        <li>
                          • By submitting, you confirm you have rights to share
                          these photos
                        </li>
                        <li>
                          • Private photos will only be visible to family
                          members
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-white/10">
              <div>
                {step > 1 && (
                  <motion.button
                    onClick={prevStep}
                    className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Previous
                  </motion.button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={onClose}
                  className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-text-secondary transition-colors"
                >
                  Cancel
                </button>

                {step < 3 ? (
                  <motion.button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-3 rounded-lg font-headings font-medium cursor-pointer hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-3 rounded-lg font-headings font-medium cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Photos</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoSubmissionForm;
