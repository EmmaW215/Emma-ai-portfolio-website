"use client"

import { useEffect, useRef, useState } from "react"
import { ProjectCard } from "./project-card"
import { Brain, Lightbulb } from "lucide-react"

const aiSystemProjects = [
  {
    title: "SmartSuccess.ai",
    subtitle: "AI Career Intelligence Platform",
    description:
      "An intelligent career guidance platform powered by AI that analyzes career trajectories, provides personalized recommendations, and helps professionals make data-driven decisions about their career paths using advanced LLM reasoning.",
    tags: ["AI/ML", "LLM", "Career Intelligence", "Agentic AI", "Multi-Batch-RAG", "Python", "Next.js"],
    github: "https://github.com/EmmaW215/SmartSccuss_Career_Intelligence_AI",
    demo: "https://smart-sccuss-career-intelligence-ai.vercel.app/",
    icon: "cpu" as const,
  },
  {
    title: "MatchWise.ai",
    subtitle: "AI-powered Resume & Job Matching System",
    description:
      "A sophisticated matching system that leverages NLP and semantic analysis to intelligently pair resumes with job opportunities, providing candidates and recruiters with AI-driven compatibility scores and insights.",
    tags: ["NLP", "Semantic Search", "Matching AI", "Python", "React"],
    github: "https://github.com/EmmaW215/matchwise-ai",
    demo: "https://matchwise-ai.vercel.app/",
    icon: "sparkles" as const,
  },
  {
    title: "AI Research Agent",
    subtitle: "Modular RAG & LLM Fine-Tuning Framework",
    description:
      "A modular framework for building Retrieval-Augmented Generation pipelines and fine-tuning Large Language Models for academic research. Features customizable RAG components, evaluation metrics, and deployment-ready fine-tuning workflows.",
    tags: ["RAG", "LLM Fine-Tuning", "Research", "Modular Architecture"],
    github: "https://github.com/EmmaW215/Academic-LLM-Fine-Tuning-System",
    demo: "https://academic-llm-fine-tuning-system.vercel.app/",
    icon: "layers" as const,
  },
]

const innovationProjects = [
  {
    title: "DESIGN THE FUTURE",
    subtitle: "AI & 3D Printing Workshop",
    description:
      "An innovative educational platform combining AI-driven design tools with 3D printing technology. Offers interactive workshops that teach participants to leverage generative AI for creating printable 3D models and prototypes.",
    tags: ["AI Education", "3D Printing", "Workshop Platform", "Creative AI"],
    github: "https://github.com/EmmaW215/DESIGN-THE-FUTURE-AI-3D-PRINTING-WORKSHOP",
    demo: "https://design-the-future-ai-3-d-printing-w.vercel.app/",
    icon: "sparkles" as const,
  },
  {
    title: "OBM RecFind Drop-In",
    subtitle: "Community Program Search Platform",
    description:
      "A community-focused platform that helps users discover and connect with local recreational programs and drop-in activities. Features intelligent search, filtering, and recommendation systems to match users with relevant community offerings.",
    tags: ["Community Platform", "Search System", "Full-Stack", "UX Design"],
    github: "https://github.com/EmmaW215/obm-recfind-dropin",
    icon: "cpu" as const,
  },
]

function SectionHeader({
  icon: Icon,
  label,
  title,
}: {
  icon: typeof Brain
  label: string
  title: string
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-accent text-xs tracking-[0.25em] uppercase font-medium">
          {label}
        </span>
      </div>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-balance">
        {title}
      </h2>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-px w-16 bg-accent/40" />
        <div className="h-1 w-1 rounded-full bg-accent/60" />
        <div className="h-px flex-1 bg-border/50" />
      </div>
    </div>
  )
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  )
}

export function PortfolioSection({ isRevealed }: { isRevealed: boolean }) {
  return (
    <section
      id="portfolio"
      className={`relative z-10 transition-opacity duration-1000 ${
        isRevealed ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Portfolio projects"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-16 py-24">
        {/* Section 1: AI System Architecture */}
        <AnimatedSection>
          <SectionHeader
            icon={Brain}
            label="Section 01"
            title="AI System Architecture & Intelligent Platforms"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {aiSystemProjects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 150}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        {/* Section 2: AI-Driven Innovation */}
        <AnimatedSection>
          <SectionHeader
            icon={Lightbulb}
            label="Section 02"
            title="AI-Driven Innovation & Education Platforms for Business"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {innovationProjects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 150}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
