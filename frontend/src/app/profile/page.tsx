"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/landingPage/Footer";

type Experience = {
  company: string;
  role: string;
  from: string; 
  to: string | "Present";
  description: string;
};

type Education = {
  institution: string;
  degree: string;
  duration: string;
  score: number;
  maxScore: number;
};

type Certification = {
  name: string;
  issuer: string;
  date: string;
  image: {
    url: string;
    publicId: string;
  };
};

type ProfileData = {
  name: string;
  username: string;
  email: string;
  profileImage: {
    url: string;
    publicId: string;
  };
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: string[];
};

const initialData: ProfileData = {
  name: "Himanshu Gaura",
  username: "himanshugaura",
  email: "himanshu@example.com",
  profileImage: {
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop",
    publicId: "users/himanshu/profile",
  },
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "System Design",
  ],
  experience: [
    {
      company: "Acme Labs",
      role: "Frontend Engineer",
      from: "2023-06-01",
      to: "Present",
      description:
        "Built scalable UI architecture for community platform, improved page performance, and shipped rich editor + collaboration experiences.",
    },
    {
      company: "Nova Tech",
      role: "Software Engineer Intern",
      from: "2022-01-01",
      to: "2022-05-31",
      description:
        "Developed internal dashboards, added analytics tracking, and wrote reusable design system components.",
    },
  ],
  education: [
    {
      institution: "National Institute of Technology",
      degree: "B.Tech in Computer Science",
      duration: "2019 - 2023",
      score: 8.7,
      maxScore: 10,
    },
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024-03-10",
      image: {
        url: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=1200&q=80&auto=format&fit=crop",
        publicId: "cert/aws-ccp",
      },
    },
  ],
  achievements: [
    "Winner - Smart India Hackathon regional round",
    "Top 2% in coding contest (2,000+ participants)",
    "Built open-source component library with 500+ GitHub stars",
  ],
};

function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[rgba(240,236,228,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[rgba(240,236,228,0.08)] flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[16px] text-[#f0ece4] tracking-[0.02em]">{title}</h3>
          {subtitle ? (
            <p className="text-[12px] text-[rgba(240,236,228,0.35)] mt-1">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-[14px] bg-[rgba(255,255,255,0.02)] text-[#f0ece4] border border-[rgba(240,236,228,0.08)] rounded-xl placeholder:text-[rgba(240,236,228,0.25)] outline-none transition-all duration-200 focus:border-[rgba(240,236,228,0.2)] focus:bg-[rgba(255,255,255,0.04)]"
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[12px] uppercase tracking-[0.08em] text-[rgba(240,236,228,0.45)]">
      {children}
    </label>
  );
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData>(initialData);
  const [skillInput, setSkillInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");

  const profileCompletion = useMemo(() => {
    let score = 0;
    if (data.name) score += 10;
    if (data.username) score += 10;
    if (data.email) score += 10;
    if (data.profileImage.url) score += 10;
    if (data.skills.length) score += 15;
    if (data.experience.length) score += 15;
    if (data.education.length) score += 10;
    if (data.certifications.length) score += 10;
    if (data.achievements.length) score += 10;
    return Math.min(score, 100);
  }, [data]);

  const addSkill = () => {
    const val = skillInput.trim();
    if (!val) return;
    if (data.skills.includes(val)) return setSkillInput("");
    setData((prev) => ({ ...prev, skills: [...prev.skills, val] }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const addAchievement = () => {
    const val = achievementInput.trim();
    if (!val) return;
    if (data.achievements.includes(val)) return setAchievementInput("");
    setData((prev) => ({ ...prev, achievements: [...prev.achievements, val] }));
    setAchievementInput("");
  };

  const removeAchievement = (val: string) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a !== val),
    }));
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          from: "",
          to: "Present",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (idx: number, patch: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) =>
        i === idx ? { ...item, ...patch } : item
      ),
    }));
  };

  const removeExperience = (idx: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", degree: "", duration: "", score: 0, maxScore: 10 },
      ],
    }));
  };

  const updateEducation = (idx: number, patch: Partial<Education>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((item, i) =>
        i === idx ? { ...item, ...patch } : item
      ),
    }));
  };

  const removeEducation = (idx: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  const addCertification = () => {
    setData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          date: "",
          image: { url: "", publicId: "" },
        },
      ],
    }));
  };

  const updateCertification = (idx: number, patch: Partial<Certification>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item, i) =>
        i === idx ? { ...item, ...patch } : item
      ),
    }));
  };

  const removeCertification = (idx: number) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile payload:", data);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['DM_Sans']">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 md:px-8 pt-10 pb-20">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[rgba(240,236,228,0.35)] mb-2">
              Profile
            </p>
            <h1 className="font-['Playfair_Display'] text-[clamp(30px,4.2vw,46px)] text-[#f0ece4] leading-[1.1] tracking-[-0.02em]">
              Professional Portfolio
            </h1>
            <p className="text-[14px] text-[rgba(240,236,228,0.38)] mt-3 max-w-2xl leading-[1.7]">
              Build a high-signal profile that presents your experience, skills, achievements and credentials in a cleaner, more compelling format than a traditional resume.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-[rgba(240,236,228,0.1)] bg-[rgba(255,255,255,0.02)] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-[rgba(240,236,228,0.4)] tracking-[0.08em] uppercase">
                Profile Strength
              </span>
              <span className="text-[13px] text-[#f0ece4]">{profileCompletion}%</span>
            </div>
            <div className="h-2 rounded-full bg-[rgba(240,236,228,0.08)] overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-emerald-400/70 via-sky-400/70 to-violet-400/70"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            <SectionCard title="Identity" subtitle="Core account details">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[rgba(240,236,228,0.12)]">
                  <img
                    src={data.profileImage.url || "https://placehold.co/200x200?text=User"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <Label>Profile Image URL</Label>
                  <Input
                    value={data.profileImage.url}
                    onChange={(v) =>
                      setData((prev) => ({
                        ...prev,
                        profileImage: { ...prev.profileImage, url: v },
                      }))
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="w-full">
                  <Label>Profile Image Public ID</Label>
                  <Input
                    value={data.profileImage.publicId}
                    onChange={(v) =>
                      setData((prev) => ({
                        ...prev,
                        profileImage: { ...prev.profileImage, publicId: v },
                      }))
                    }
                    placeholder="users/username/profile"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={data.name}
                    onChange={(v) => setData((prev) => ({ ...prev, name: v }))}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label>Username</Label>
                  <Input
                    value={data.username}
                    onChange={(v) => setData((prev) => ({ ...prev, username: v }))}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={data.email}
                    onChange={(v) => setData((prev) => ({ ...prev, email: v }))}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Skills" subtitle="What you’re best at">
              <div className="flex flex-wrap gap-2 mb-4">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 text-[12px] px-3 py-1.5 rounded-lg bg-[rgba(139,92,246,0.08)] text-[rgba(196,181,253,0.8)] border border-[rgba(139,92,246,0.22)]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-[rgba(196,181,253,0.45)] hover:text-[rgba(196,181,253,0.95)]"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={setSkillInput}
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 rounded-xl border border-[rgba(240,236,228,0.18)] text-[#f0ece4] bg-[rgba(240,236,228,0.1)] hover:bg-[rgba(240,236,228,0.16)] transition"
                >
                  Add
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Achievements" subtitle="Highlights that stand out">
              <div className="space-y-2 mb-4">
                {data.achievements.map((a) => (
                  <div
                    key={a}
                    className="flex items-start justify-between gap-3 text-[13px] text-[rgba(240,236,228,0.72)] px-3 py-2.5 rounded-lg border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.015)]"
                  >
                    <span>• {a}</span>
                    <button
                      type="button"
                      onClick={() => removeAchievement(a)}
                      className="text-[rgba(240,236,228,0.35)] hover:text-[rgba(240,236,228,0.8)]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={achievementInput}
                  onChange={setAchievementInput}
                  placeholder="Add achievement"
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-4 rounded-xl border border-[rgba(240,236,228,0.18)] text-[#f0ece4] bg-[rgba(240,236,228,0.1)] hover:bg-[rgba(240,236,228,0.16)] transition"
                >
                  Add
                </button>
              </div>
            </SectionCard>
          </div>

          {/* Right column */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <SectionCard
              title="Experience"
              subtitle="Professional roles and contributions"
              action={
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-[12px] px-3 py-1.5 rounded-lg border border-[rgba(240,236,228,0.16)] text-[#f0ece4] bg-[rgba(240,236,228,0.08)] hover:bg-[rgba(240,236,228,0.14)]"
                >
                  + Add Experience
                </button>
              }
            >
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.01)] p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(v) => updateExperience(idx, { company: v })}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input
                          value={exp.role}
                          onChange={(v) => updateExperience(idx, { role: v })}
                          placeholder="Role / title"
                        />
                      </div>
                      <div>
                        <Label>From</Label>
                        <Input
                          type="date"
                          value={exp.from}
                          onChange={(v) => updateExperience(idx, { from: v })}
                        />
                      </div>
                      <div>
                        <Label>To (date or Present)</Label>
                        <Input
                          value={exp.to}
                          onChange={(v) =>
                            updateExperience(idx, { to: (v || "Present") as string | "Present" })
                          }
                          placeholder="Present"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label>Description</Label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(idx, { description: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 text-[14px] bg-[rgba(255,255,255,0.02)] text-[#f0ece4] border border-[rgba(240,236,228,0.08)] rounded-xl placeholder:text-[rgba(240,236,228,0.25)] outline-none transition-all duration-200 focus:border-[rgba(240,236,228,0.2)] focus:bg-[rgba(255,255,255,0.04)] resize-none"
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeExperience(idx)}
                        className="text-[12px] text-red-400/80 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Education"
              subtitle="Academic background"
              action={
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-[12px] px-3 py-1.5 rounded-lg border border-[rgba(240,236,228,0.16)] text-[#f0ece4] bg-[rgba(240,236,228,0.08)] hover:bg-[rgba(240,236,228,0.14)]"
                >
                  + Add Education
                </button>
              }
            >
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.01)] p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(v) => updateEducation(idx, { institution: v })}
                          placeholder="Institution"
                        />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(v) => updateEducation(idx, { degree: v })}
                          placeholder="Degree"
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          value={edu.duration}
                          onChange={(v) => updateEducation(idx, { duration: v })}
                          placeholder="2019 - 2023"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Score</Label>
                          <Input
                            type="number"
                            value={edu.score}
                            onChange={(v) =>
                              updateEducation(idx, { score: Number(v || 0) })
                            }
                          />
                        </div>
                        <div>
                          <Label>Max Score</Label>
                          <Input
                            type="number"
                            value={edu.maxScore}
                            onChange={(v) =>
                              updateEducation(idx, { maxScore: Number(v || 0) })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeEducation(idx)}
                        className="text-[12px] text-red-400/80 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Certifications"
              subtitle="Proof of specialized expertise"
              action={
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-[12px] px-3 py-1.5 rounded-lg border border-[rgba(240,236,228,0.16)] text-[#f0ece4] bg-[rgba(240,236,228,0.08)] hover:bg-[rgba(240,236,228,0.14)]"
                >
                  + Add Certification
                </button>
              }
            >
              <div className="space-y-4">
                {data.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.01)] p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Certification Name</Label>
                        <Input
                          value={cert.name}
                          onChange={(v) => updateCertification(idx, { name: v })}
                          placeholder="Certification name"
                        />
                      </div>
                      <div>
                        <Label>Issuer</Label>
                        <Input
                          value={cert.issuer}
                          onChange={(v) => updateCertification(idx, { issuer: v })}
                          placeholder="Issuer"
                        />
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={cert.date}
                          onChange={(v) => updateCertification(idx, { date: v })}
                        />
                      </div>
                      <div>
                        <Label>Image Public ID</Label>
                        <Input
                          value={cert.image.publicId}
                          onChange={(v) =>
                            updateCertification(idx, {
                              image: { ...cert.image, publicId: v },
                            })
                          }
                          placeholder="certs/xyz"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Certificate Image URL</Label>
                        <Input
                          value={cert.image.url}
                          onChange={(v) =>
                            updateCertification(idx, {
                              image: { ...cert.image, url: v },
                            })
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {cert.image.url ? (
                      <div className="mt-3 rounded-xl overflow-hidden border border-[rgba(240,236,228,0.08)]">
                        <img
                          src={cert.image.url}
                          alt={cert.name || "Certificate"}
                          className="w-full h-44 object-cover"
                        />
                      </div>
                    ) : null}

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeCertification(idx)}
                        className="text-[12px] text-red-400/80 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Footer actions */}
          <div className="xl:col-span-3 flex items-center justify-between pt-2">
            <a
              href="/"
              className="text-[13px] tracking-[0.03em] text-[rgba(240,236,228,0.35)] no-underline transition-colors duration-200 hover:text-[rgba(240,236,228,0.7)]"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="text-[13px] tracking-[0.04em] px-7 py-3 rounded-xl border border-[rgba(240,236,228,0.18)] bg-[rgba(240,236,228,0.1)] text-[#f0ece4] transition-all duration-200 hover:bg-[rgba(240,236,228,0.18)] hover:border-[rgba(240,236,228,0.28)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.25)]"
            >
              Save Profile
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}