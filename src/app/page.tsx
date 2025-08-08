"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Mail,
  FileText,
  MapPin,
  Rocket,
  ArrowRight,
  Linkedin,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Code,
  Star,
  GitBranch,
  Globe,
  Terminal,
  ChevronDown,
} from "lucide-react";

// =====================
// CONFIG
// =====================
const site = {
  title: "Amir Nosratoddin",
  tagline: "Full-Stack Developer · React/Next.js · Node.js · PostgreSQL/MongoDB",
  ctaText: "Get In Touch",
};

const profile = {
  name: "Amirhossein Nosratoddin",
  location: "Thunder Bay, ON, Canada",
  email: "amirhosein279279@gmail.com",
  githubUser: "Amirnsd",
  resumeUrl: "/resume.pdf",
  about:
    "I craft exceptional digital experiences with modern web technologies. Passionate about clean code, innovative solutions, and pushing the boundaries of what's possible on the web.",
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "C", "C++", "Java"],
    backend: ["Node.js", "Express", "REST", "FastAPI", "PostgreSQL", "MongoDB", "MSSQL"],
    frontend: ["React", "Next.js", "Tailwind", "EJS"],
    ml: ["PyTorch", "Torchvision", "Hugging Face", "OpenCV"],
    tools: ["Git", "GitHub Actions", "Docker", "Figma", "Redux", "Context API"],
  },
  links: {
    github: "https://github.com/Amirnsd",
    linkedin: "https://www.linkedin.com/in/amirhossein-nosratoddin-600304249/",
    email: "mailto:amirhosein279279@gmail.com",
  },
};

// Just for reference (mock data is below)
const featuredRepos: string[] = [
  "Amirnsd/nft-auction",
  "Amirnsd/Members-Only",
  "Amirnsd/Secure-Bank",
  "Amirnsd/shopping-cart",
];

// Live URL map fallback if a repo doesn't set `homepage`
const deployments: Record<string, string> = {
  "Amirnsd/Mini-Message-Board": "https://mini-message-board-five.vercel.app",
  "Amirnsd/shopping-cart": "https://epicfabrics.netlify.app",
  // Add real ones if/when you have them:
  // "Amirnsd/Members-Only": "https://<your-vercel>.vercel.app",
  // "Amirnsd/nft-auction": "https://<your-live-url>",
  // "Amirnsd/Secure-Bank": "https://<your-live-url>",
};

// Dynamic theme system
const THEMES = {
  cyberpunk: {
    name: "Cyberpunk",
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    accent: "from-cyan-400 to-purple-500",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    particle: "#a855f7",
  },
  neon: {
    name: "Neon",
    gradient: "from-green-400 via-blue-500 to-purple-600",
    accent: "from-green-400 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    particle: "#22c55e",
  },
  sunset: {
    name: "Sunset",
    gradient: "from-orange-400 via-red-500 to-pink-600",
    accent: "from-amber-400 to-orange-500",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.4)]",
    particle: "#fb923c",
  },
  ocean: {
    name: "Ocean",
    gradient: "from-blue-400 via-cyan-500 to-teal-600",
    accent: "from-blue-400 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    particle: "#3b82f6",
  },
  aurora: {
    name: "Aurora",
    gradient: "from-emerald-400 via-sky-500 to-indigo-600",
    accent: "from-emerald-400 to-sky-500",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    particle: "#10b981",
  },
};

// =====================
// COMPONENTS
// =====================

// Floating particles background
function ParticleField({ theme }: { theme: typeof THEMES.cyberpunk }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          theme.particle + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle =
              theme.particle + Math.floor((1 - d / 100) * 50).toString(16).padStart(2, "0");
            ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [theme.particle]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20 pointer-events-none" />;
}

// Interactive 3D card with glassmorphism
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / 20;
    const y = (e.clientY - r.top - r.height / 2) / 20;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl transition-all duration-300 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl" />
      {children}
    </div>
  );
}

// Animated gradient text
function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse ${className}`}
    >
      {children}
    </span>
  );
}

// Skill pill
function SkillPill({ skill, delay = 0 }: { skill: string; delay?: number }) {
  return (
    <div
      className="px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 text-sm font-medium hover:scale-110 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      {skill}
    </div>
  );
}

// Enhanced project card (buttons only; no raw URLs shown)
function ProjectCard({ repo, theme }: { repo: any; theme: typeof THEMES.cyberpunk }) {
  const repoUrl = repo?.html_url ?? "";
  const liveUrl = repo?.homepage || deployments[repo?.full_name] || ""; // fallback to map
  const liveHref = liveUrl || repoUrl; // if no live, send to repo

  return (
    <div className="group relative">
      <GlassCard className="p-6 h-full hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.accent}`} />
            <h3 className="font-bold text-lg">{repo.name}</h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitBranch className="w-4 h-4" />
              {repo.forks_count}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {repo.description || "An amazing project with cutting-edge technology and innovative features."}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(repo.topics || []).slice(0, 4).map((topic: string) => (
            <span
              key={topic}
              className="px-3 py-1 text-xs rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Buttons (link out; no extra URLs shown) */}
        <div className="flex gap-3 mt-auto">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${theme.accent} text-white font-medium hover:scale-105 transition-all duration-300 ${theme.glow}`}
          >
            <Code className="w-4 h-4" />
            Code
          </a>

          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            Live
          </a>
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ${theme.glow}`}
        />
      </GlassCard>
    </div>
  );
}

// =====================
// MAIN PAGE
// =====================
export default function ModernPortfolio() {
  const [repos, setRepos] = useState<any[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<keyof typeof THEMES>("cyberpunk");
  const [activeFilter, setActiveFilter] = useState("All");

  const theme = THEMES[currentTheme];

  // Load persisted theme + mode
  useEffect(() => {
    const savedUiTheme = localStorage.getItem("portfolioTheme") as keyof typeof THEMES | null;
    if (savedUiTheme && THEMES[savedUiTheme]) setCurrentTheme(savedUiTheme);

    const savedMode = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = savedMode ? savedMode === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // MOCK data (swap to GitHub API later if you want live)
  useEffect(() => {
    const mock = [
      {
        name: "NFT Auction Platform",
        full_name: "Amirnsd/nft-auction",
        description:
          "A full-stack NFT marketplace with real-time bidding, blockchain integration, and modern UI/UX design.",
        html_url: "https://github.com/Amirnsd/nft-auction",
        homepage: "", // put real live URL if available
        stargazers_count: 42,
        forks_count: 12,
        topics: ["react", "blockchain", "nft", "web3", "ethereum"],
      },
      {
        name: "Members Only Club",
        full_name: "Amirnsd/Members-Only",
        description:
          "Exclusive membership platform with authentication, private messaging, and admin controls.",
        html_url: "https://github.com/Amirnsd/Members-Only",
        homepage: "", // put real live URL if available
        stargazers_count: 28,
        forks_count: 8,
        topics: ["nodejs", "express", "authentication", "mongodb"],
      },
      {
        name: "Secure Banking App",
        full_name: "Amirnsd/Secure-Bank",
        description:
          "Modern banking interface with advanced security features, transaction tracking, and analytics.",
        html_url: "https://github.com/Amirnsd/Secure-Bank",
        homepage: "", // put real live URL if available
        stargazers_count: 67,
        forks_count: 23,
        topics: ["react", "security", "fintech", "typescript"],
      },
      {
        name: "E-Commerce Platform",
        full_name: "Amirnsd/shopping-cart",
        description:
          "Full-featured online store with cart management, payment integration, and inventory tracking.",
        html_url: "https://github.com/Amirnsd/shopping-cart",
        homepage: "https://epicfabrics.netlify.app",
        stargazers_count: 54,
        forks_count: 18,
        topics: ["ecommerce", "react", "stripe", "nextjs"],
      },
    ];
    setRepos(mock);
  }, []);

  // Topics + filter
  const allTopics = Array.from(new Set(repos.flatMap((r) => r.topics || [])));
  const filteredRepos =
    activeFilter === "All" ? repos : repos.filter((r) => (r.topics || []).includes(activeFilter));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-colors duration-500">
      {/* Particle background */}
      <ParticleField theme={theme} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl">
              <GradientText>Amir.dev</GradientText>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Theme + Mobile menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white/10 dark:bg-black/20 backdrop-blur-xl border-t border-white/20 dark:border-white/10">
            <div className="px-4 py-4 space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero / About */}
      <section id="about" className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl font-black leading-tight">
                  Hello, I'm <GradientText className="block">Amirhossein</GradientText>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{site.tagline}</p>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">{profile.about}</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>{profile.location}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${theme.accent} text-white font-medium hover:scale-105 transition-all duration-300 ${theme.glow}`}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href={profile.resumeUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  Resume
                </a>
              </div>
            </div>

            <div className="relative">
              <GlassCard className="p-8">
                <div className="text-center space-y-6">
                  <div
                    className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center ${theme.glow}`}
                  >
                    <Terminal className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Let's Build Something Amazing</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ready to turn your ideas into reality with cutting-edge web technologies.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">50+</div>
                      <div className="text-sm text-gray-500">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">3+</div>
                      <div className="text-sm text-gray-500">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">100%</div>
                      <div className="text-sm text-gray-500">Passion</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Skills & Technologies</GradientText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The tools and technologies I use</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(profile.skills).map(([category, skills], i) => (
              <GlassCard key={category} className="p-6">
                <h3 className="text-lg font-bold mb-4 capitalize flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  {category}
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, j) => (
                    <SkillPill key={skill} skill={skill} delay={i * 100 + j * 50} />
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Featured Projects</GradientText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">A showcase of my latest work</p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === "All"
                  ? `bg-gradient-to-r ${theme.accent} text-white ${theme.glow}`
                  : "bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30"
              }`}
            >
              All
            </button>
            {allTopics.slice(0, 6).map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveFilter(topic)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
                  activeFilter === topic
                    ? `bg-gradient-to-r ${theme.accent} text-white ${theme.glow}`
                    : "bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRepos.map((repo, index) => (
              <div
                key={repo.full_name}
                style={{ animationDelay: `${index * 100}ms` }}
                className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              >
                <ProjectCard repo={repo} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Let's Work Together</GradientText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Let’s bring your vision to life.
            </p>
          </div>

          <GlassCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <a
                href={profile.links.email}
                className="group flex flex-col items-center p-6 rounded-xl hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${theme.glow}`}
                >
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{profile.email}</p>
              </a>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${theme.glow}`}
                >
                  <Github className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">GitHub</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">@Amirnsd</p>
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${theme.glow}`}
                >
                  <Linkedin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Professional Network</p>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/10">
              <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm always open to discussing new opportunities and interesting projects.
              </p>
              <a
                href={profile.links.email}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r ${theme.accent} text-white font-medium hover:scale-105 transition-all duration-300 ${theme.glow} text-lg`}
              >
                <Rocket className="w-6 h-6" />
                {site.ctaText}
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} {profile.name}. Crafted with passion and modern web technologies.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={profile.links.email}
                className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Theme Selector - Floating Panel */}
      <div className="fixed bottom-6 right-6 z-50">
        <GlassCard className="p-4">
          <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Theme
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentTheme(key as keyof typeof THEMES);
                  localStorage.setItem("portfolioTheme", key);
                }}
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${t.gradient} border-2 transition-all duration-300 ${
                  currentTheme === key ? "border-white shadow-lg scale-110" : "border-transparent hover:scale-105"
                }`}
                title={t.name}
                aria-label={`Use ${t.name} theme`}
              />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-50 p-3 rounded-full bg-gradient-to-r ${theme.accent} text-white hover:scale-110 transition-all duration-300 ${theme.glow}`}
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-5 h-5 -rotate-90" />
      </button>

      {/* Custom animations + global tweaks */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #3b82f6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #2563eb);
        }

        @supports (backdrop-filter: blur(10px)) {
          .backdrop-blur-xl {
            backdrop-filter: blur(20px);
          }
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
        }
      `}</style>
    </div>
  ) ;
}
