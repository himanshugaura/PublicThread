"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { prettyCat } from "@/lib/utils";
import { CATEGORIES, Languages } from "@/types/constants.types";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/landingPage/Footer";

import SectionLabel from "@/components/createPost/SectionLabel";
import TextField from "@/components/createPost/TextField";
import DropdownSingle from "@/components/createPost/DropdownSingle";
import DropdownMulti from "@/components/createPost/DropdownMulti";
import TagInput from "@/components/createPost/TagInput";
import ThumbnailUploader from "@/components/createPost/ThumbnailUploader";
import CropModal from "@/components/createPost/CropModal";

const LANGUAGES_LIST = Object.values(Languages);

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxUsers, setMaxUsers] = useState("");
  const [category, setCategory] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [eligibility, setEligibility] = useState<string[]>([]);
  const [eligibilityInput, setEligibilityInput] = useState("");

  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  // SOURCE OF TRUTH: actual image file
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // UI-only preview (derived from thumbnail file)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [tempFileName, setTempFileName] = useState("thumbnail.jpg");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // derive preview from actual file
  useEffect(() => {
    if (!thumbnail) {
      setThumbnailPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result as string);
    reader.readAsDataURL(thumbnail);
  }, [thumbnail]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const openCropperWithFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result as string);
      setTempFileName(file.name || "thumbnail.jpg");
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeThumbnail = () => {
    setThumbnail(null);
    setTempImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startAt || !endAt) return;

    const payload = {
      title,
      description,
      maxUsers: Number(maxUsers),
      category,
      languages: selectedLanguages,
      eligibility,
      skillsRequired,
      keywords,
      startAt: new Date(startAt).toISOString(),
      endAt: new Date(endAt).toISOString(),
      thumbnail, // actual file
    };

    console.log("Create Post payload:", payload);

    // Example FormData:
    // const fd = new FormData();
    // fd.append("title", title);
    // ...
    // if (thumbnail) fd.append("thumbnail", thumbnail);
  };

  const isValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    maxUsers !== "" &&
    Number(maxUsers) > 0 &&
    category !== "" &&
    selectedLanguages.length > 0 &&
    startAt !== "" &&
    endAt !== "" &&
    new Date(endAt).getTime() >= new Date(startAt).getTime();

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['DM_Sans']">
      <Navbar />

      <div className="max-w-3xl mx-auto px-8 pt-14 pb-24">
        {/* Header */}
        <div className="mb-10">
          <a
            href="/posts"
            className="inline-flex items-center gap-2 text-[13px] text-[rgba(240,236,228,0.35)] no-underline transition-colors duration-200 hover:text-[rgba(240,236,228,0.7)] mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Discussions
          </a>
          <h1 className="font-['Playfair_Display'] text-[clamp(28px,3.5vw,40px)] text-[#f0ece4] leading-[1.1] tracking-[-0.02em]">
            Create a Discussion
          </h1>
          <p className="text-[14px] text-[rgba(240,236,228,0.35)] font-light mt-3 leading-[1.6]">
            Set up a new discussion for the community to join
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <ThumbnailUploader
            thumbnail={thumbnail}
            thumbnailPreview={thumbnailPreview}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            fileInputRef={fileInputRef}
            onPickFile={openCropperWithFile}
            onDropFile={openCropperWithFile}
            onRemove={removeThumbnail}
          />

          <div className="flex flex-col gap-2.5">
            <SectionLabel label="Title" required />
            <TextField
              value={title}
              onChange={setTitle}
              placeholder="Give your discussion a compelling title"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel label="Description" required />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this discussion is about, what topics will be covered, and what participants can expect..."
              rows={5}
              className="w-full px-4 py-3 text-[14px] bg-[rgba(255,255,255,0.02)] text-[#f0ece4] border border-[rgba(240,236,228,0.07)] rounded-xl placeholder:text-[rgba(240,236,228,0.2)] outline-none transition-all duration-200 focus:border-[rgba(240,236,228,0.15)] focus:bg-[rgba(255,255,255,0.04)] resize-none leading-[1.7]"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel label="Max Participants" required />
            <TextField
              type="number"
              min="1"
              value={maxUsers}
              onChange={setMaxUsers}
              placeholder="e.g. 250"
              className="w-48 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel label="Category" required />
            <DropdownSingle
              open={categoryOpen}
              setOpen={setCategoryOpen}
              value={category}
              placeholder="Select a category"
              options={CATEGORIES}
              onSelect={setCategory}
              renderLabel={prettyCat}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel label="Languages" required />

            {selectedLanguages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-1">
                {selectedLanguages.map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg bg-[rgba(139,92,246,0.08)] text-[rgba(167,139,250,0.6)] border border-[rgba(139,92,246,0.12)] transition-all duration-150 cursor-pointer hover:bg-[rgba(139,92,246,0.14)] hover:text-[rgba(167,139,250,0.8)]"
                  >
                    {lang}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            <DropdownMulti
              open={languageOpen}
              setOpen={setLanguageOpen}
              selected={selectedLanguages}
              options={LANGUAGES_LIST}
              onToggle={toggleLanguage}
              onClear={() => setSelectedLanguages([])}
            />
          </div>

          <TagInput
            label="Eligibility"
            hint="Type and tap + to add each eligibility criterion"
            items={eligibility}
            setItems={setEligibility}
            inputValue={eligibilityInput}
            setInputValue={setEligibilityInput}
            placeholder="e.g. Intermediate to advanced developers"
            pillClassName="bg-[rgba(52,211,153,0.08)] text-emerald-400/70 border-emerald-400/12"
            removeBtnClassName="text-emerald-400/40 hover:text-emerald-400/80"
            addBtnClassName="bg-[rgba(52,211,153,0.12)] border-emerald-400/15 hover:bg-[rgba(52,211,153,0.2)]"
            addIconStrokeClass="rgba(52,211,153,0.7)"
          />

          <TagInput
            label="Skills Required"
            hint="Type and tap + to add each skill"
            items={skillsRequired}
            setItems={setSkillsRequired}
            inputValue={skillInput}
            setInputValue={setSkillInput}
            placeholder="e.g. TypeScript, React, Node.js"
            pillClassName="bg-[rgba(240,236,228,0.05)] text-[rgba(240,236,228,0.55)] border-[rgba(240,236,228,0.1)]"
            removeBtnClassName="text-[rgba(240,236,228,0.25)] hover:text-[rgba(240,236,228,0.7)]"
            addBtnClassName="bg-[rgba(240,236,228,0.08)] border-[rgba(240,236,228,0.12)] hover:bg-[rgba(240,236,228,0.15)]"
          />

          <TagInput
            label="Keywords"
            hint="Type and tap + to add keywords — helps with search discoverability"
            items={keywords}
            setItems={setKeywords}
            inputValue={keywordInput}
            setInputValue={setKeywordInput}
            placeholder="e.g. real-time, collaboration, CRDT"
            pillClassName="bg-[rgba(59,130,246,0.06)] text-[rgba(96,165,250,0.6)] border-[rgba(59,130,246,0.1)]"
            removeBtnClassName="text-[rgba(96,165,250,0.35)] hover:text-[rgba(96,165,250,0.9)]"
            addBtnClassName="bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.15)] hover:bg-[rgba(59,130,246,0.2)]"
            addIconStrokeClass="rgba(96,165,250,0.6)"
            prefix="#"
          />

          <div className="flex gap-6">
            <div className="flex flex-col gap-2.5 flex-1">
              <SectionLabel label="Starts At" required />
              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="w-full px-4 py-3 text-[14px] bg-[rgba(255,255,255,0.02)] text-[#f0ece4] border border-[rgba(240,236,228,0.07)] rounded-xl outline-none transition-all duration-200 focus:border-[rgba(240,236,228,0.15)] focus:bg-[rgba(255,255,255,0.04)] [color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-2.5 flex-1">
              <SectionLabel label="Ends At" required />
              <input
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                min={startAt}
                className="w-full px-4 py-3 text-[14px] bg-[rgba(255,255,255,0.02)] text-[#f0ece4] border border-[rgba(240,236,228,0.07)] rounded-xl outline-none transition-all duration-200 focus:border-[rgba(240,236,228,0.15)] focus:bg-[rgba(255,255,255,0.04)] [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="w-full h-px bg-[rgba(240,236,228,0.06)]" />

          <div className="flex items-center justify-between">
            <a
              href="/posts"
              className="text-[13px] tracking-[0.03em] text-[rgba(240,236,228,0.35)] no-underline transition-colors duration-200 hover:text-[rgba(240,236,228,0.7)]"
            >
              Cancel
            </a>

            <button
              type="submit"
              disabled={!isValid}
              className={`
                text-[13px] tracking-[0.04em] px-7 py-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2
                ${isValid
                  ? "bg-[rgba(240,236,228,0.1)] text-[#f0ece4] border-[rgba(240,236,228,0.15)] hover:bg-[rgba(240,236,228,0.18)] hover:border-[rgba(240,236,228,0.25)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.25)]"
                  : "bg-[rgba(255,255,255,0.02)] text-[rgba(240,236,228,0.2)] border-[rgba(240,236,228,0.05)] cursor-not-allowed"
                }
              `}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Discussion
            </button>
          </div>
        </form>
      </div>

      <CropModal
        open={cropModalOpen}
        imageSrc={tempImageSrc}
        fileName={tempFileName}
        onCancel={() => setCropModalOpen(false)}
        onApply={(file) => {
          setThumbnail(file); // store actual image
          setCropModalOpen(false);
        }}
      />

      <Footer />
    </div>
  );
}