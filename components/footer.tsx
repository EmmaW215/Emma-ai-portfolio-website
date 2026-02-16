"use client"

import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              {"Emma's AI ProtoVerse"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              From Vision to Intelligence
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/EmmaW215"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
              aria-label="Email contact"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            {"Designed & built by Emma \u00B7 Powered by Next.js & AI"}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-muted-foreground text-xs">Digital Mind Studio</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
