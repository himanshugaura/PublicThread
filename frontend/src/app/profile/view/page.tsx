"use client";

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

const profile: ProfileData = {
  name: "Himanshu Gaura",
  username: "himanshugaura",
  email: "himanshu@example.com",
  profileImage: {
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&q=80&auto=format&fit=crop",
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
        "Built scalable UI architecture for a community platform, improved performance, and shipped rich collaboration experiences.",
    },
    {
      company: "Nova Tech",
      role: "Software Engineer Intern",
      from: "2022-01-01",
      to: "2022-05-31",
      description:
        "Developed internal dashboards, integrated analytics, and built reusable design system components.",
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
        url: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=1400&q=80&auto=format&fit=crop",
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

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[rgba(240,236,228,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[rgba(240,236,228,0.08)]">
        <h3 className="text-[16px] text-[#f0ece4] tracking-[0.02em]">{title}</h3>
        {subtitle ? (
          <p className="text-[12px] text-[rgba(240,236,228,0.35)] mt-1">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function formatDate(date: string | "Present") {
  if (date === "Present") return "Present";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ProfileViewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['DM_Sans']">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 md:px-8 pt-10 pb-20">
        {/* Top Hero */}
        <div className="relative rounded-3xl border border-[rgba(240,236,228,0.12)] bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_40%),rgba(255,255,255,0.02)] overflow-hidden p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-[rgba(240,236,228,0.15)] shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <img
                src={profile.profileImage.url}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[rgba(240,236,228,0.35)] mb-2">
                Public Profile
              </p>
              <h1 className="font-['Playfair_Display'] text-[clamp(30px,4.2vw,48px)] text-[#f0ece4] leading-[1.05] tracking-[-0.02em]">
                {profile.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px]">
                <span className="px-3 py-1.5 rounded-full border border-[rgba(240,236,228,0.14)] bg-[rgba(255,255,255,0.02)] text-[rgba(240,236,228,0.78)]">
                  @{profile.username}
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="px-3 py-1.5 rounded-full border border-[rgba(240,236,228,0.14)] bg-[rgba(255,255,255,0.02)] text-[rgba(240,236,228,0.62)] hover:text-[rgba(240,236,228,0.9)] transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="md:self-start">
              <a
                href="/profile/edit"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.05em] uppercase px-4 py-2.5 rounded-xl border border-[rgba(240,236,228,0.18)] bg-[rgba(240,236,228,0.1)] text-[#f0ece4] hover:bg-[rgba(240,236,228,0.18)] transition"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left rail */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            <Section title="Skills" subtitle="Core strengths">
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[12px] px-3 py-1.5 rounded-lg border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.08)] text-[rgba(216,180,254,0.85)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Achievements" subtitle="Milestones and impact">
              <div className="space-y-3">
                {profile.achievements.map((a) => (
                  <div
                    key={a}
                    className="text-[13px] text-[rgba(240,236,228,0.75)] leading-[1.7] px-3 py-2.5 rounded-lg border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.015)]"
                  >
                    • {a}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Quick Info">
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between text-[rgba(240,236,228,0.6)]">
                  <span>Experience entries</span>
                  <span className="text-[#f0ece4]">{profile.experience.length}</span>
                </div>
                <div className="flex justify-between text-[rgba(240,236,228,0.6)]">
                  <span>Education entries</span>
                  <span className="text-[#f0ece4]">{profile.education.length}</span>
                </div>
                <div className="flex justify-between text-[rgba(240,236,228,0.6)]">
                  <span>Certifications</span>
                  <span className="text-[#f0ece4]">{profile.certifications.length}</span>
                </div>
              </div>
            </Section>
          </div>

          {/* Main */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <Section title="Experience" subtitle="Professional journey">
              <div className="space-y-4">
                {profile.experience.map((exp, i) => (
                  <article
                    key={`${exp.company}-${i}`}
                    className="rounded-xl border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.01)] p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="text-[15px] text-[#f0ece4]">{exp.role}</h4>
                        <p className="text-[13px] text-[rgba(240,236,228,0.55)] mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-[12px] text-[rgba(240,236,228,0.45)]">
                        {formatDate(exp.from)} — {formatDate(exp.to)}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] text-[rgba(240,236,228,0.72)] leading-[1.75]">
                      {exp.description}
                    </p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Education" subtitle="Academic background">
              <div className="space-y-4">
                {profile.education.map((edu, i) => (
                  <article
                    key={`${edu.institution}-${i}`}
                    className="rounded-xl border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.01)] p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="text-[15px] text-[#f0ece4]">{edu.degree}</h4>
                        <p className="text-[13px] text-[rgba(240,236,228,0.55)] mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-[12px] text-[rgba(240,236,228,0.45)]">
                        {edu.duration}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[12px] text-[rgba(240,236,228,0.55)] mb-1.5">
                        <span>Score</span>
                        <span className="text-[#f0ece4]">
                          {edu.score} / {edu.maxScore}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[rgba(240,236,228,0.08)] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400/70 to-sky-400/70"
                          style={{ width: `${Math.min((edu.score / edu.maxScore) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Certifications" subtitle="Verified credentials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.certifications.map((cert, i) => (
                  <article
                    key={`${cert.name}-${i}`}
                    className="rounded-xl border border-[rgba(240,236,228,0.08)] bg-[rgba(255,255,255,0.01)] overflow-hidden"
                  >
                    <div className="aspect-[3/2] bg-[rgba(240,236,228,0.03)]">
                      <img
                        src={cert.image.url}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-[14px] text-[#f0ece4]">{cert.name}</h4>
                      <p className="text-[12px] text-[rgba(240,236,228,0.55)] mt-1">
                        {cert.issuer}
                      </p>
                      <p className="text-[12px] text-[rgba(240,236,228,0.4)] mt-2">
                        Issued on: {new Date(cert.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}