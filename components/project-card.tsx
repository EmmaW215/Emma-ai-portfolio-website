"use client"

import { useState } from "react"
import { ExternalLink, Github, X, ChevronRight, Cpu, Layers, Sparkles } from "lucide-react"

interface Project {
  title: string
  subtitle: string
  description: string
  tags: string[]
  github: string
  demo?: string
  icon: "cpu" | "layers" | "sparkles"
}

const iconMap = {
  cpu: Cpu,
  layers: Layers,
  sparkles: Sparkles,
}

export function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[project.icon]

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative z-40 w-full text-left rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 transition-all duration-500 hover:border-accent/30 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent animate-float"
        style={{
          boxShadow: isHovered
            ? "0 0 30px rgba(220, 38, 38, 0.08), 0 8px 32px rgba(0, 0, 0, 0.12)"
            : "0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.08)",
        }}
        aria-label={`View details for ${project.title}`}
      >
        {/* Metallic edge glow */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(180,190,210,0.05) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-secondary/50 border border-border/50 text-accent group-hover:bg-accent/10 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
          </div>

          <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-secondary/60 text-muted-foreground border border-border/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
            aria-hidden="true"
          />

          {/* Modal content */}
          <div className="relative w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden">
            {/* Header accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                  <Icon className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                {project.title}
              </h2>
              <p className="text-accent text-sm font-medium mb-4">
                {project.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-md bg-secondary/60 text-muted-foreground border border-border/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />
          </div>
        </div>
      )}
    </>
  )
}
