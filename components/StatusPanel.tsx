"use client";

import * as React from "react";

type StatusVariant = "empty" | "error" | "success" | "loading" | "info";

type StatusAction = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type StatusPanelProps = {
  variant: StatusVariant;
  title?: string;
  description?: string;
  details?: string;
  onRetry?: () => void;
  primaryAction?: StatusAction;
  secondaryAction?: StatusAction;
  className?: string;
  compact?: boolean;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variantStyles: Record<
  StatusVariant,
  {
    container: string;
    badge: string;
    title: string;
    description: string;
  }
> = {
  empty: {
    container:
      "border-slate-200 bg-gradient-to-br from-slate-50 to-white dark:border-slate-800 dark:from-slate-950 dark:to-slate-900",
    badge:
      "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-slate-700",
    title: "text-slate-900 dark:text-slate-100",
    description: "text-slate-600 dark:text-slate-400",
  },
  error: {
    container:
      "border-red-200 bg-gradient-to-br from-red-50 to-white dark:border-red-900/70 dark:from-red-950/40 dark:to-slate-900",
    badge:
      "bg-red-100 text-red-700 ring-red-200 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
    title: "text-red-900 dark:text-red-100",
    description: "text-red-700/90 dark:text-red-300/90",
  },
  success: {
    container:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white dark:border-emerald-900/70 dark:from-emerald-950/40 dark:to-slate-900",
    badge:
      "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
    title: "text-emerald-900 dark:text-emerald-100",
    description: "text-emerald-700/90 dark:text-emerald-300/90",
  },
  loading: {
    container:
      "border-indigo-200 bg-gradient-to-br from-indigo-50 to-white dark:border-indigo-900/70 dark:from-indigo-950/40 dark:to-slate-900",
    badge:
      "bg-indigo-100 text-indigo-700 ring-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:ring-indigo-800",
    title: "text-indigo-900 dark:text-indigo-100",
    description: "text-indigo-700/90 dark:text-indigo-300/90",
  },
  info: {
    container:
      "border-sky-200 bg-gradient-to-br from-sky-50 to-white dark:border-sky-900/70 dark:from-sky-950/40 dark:to-slate-900",
    badge:
      "bg-sky-100 text-sky-700 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:ring-sky-800",
    title: "text-sky-900 dark:text-sky-100",
    description: "text-sky-700/90 dark:text-sky-300/90",
  },
};

const defaults: Record<StatusVariant, { title: string; description: string; label: string }> = {
  empty: {
    title: "Nothing to show yet",
    description: "Once your team starts adding leads, activities, and deals, insights will appear here.",
    label: "Empty state",
  },
  error: {
    title: "Something went wrong",
    description: "We could not load this section. Please retry or come back in a moment.",
    label: "Error",
  },
  success: {
    title: "All caught up",
    description: "Everything is synced and your latest updates are reflected in the dashboard.",
    label: "Completed",
  },
  loading: {
    title: "Loading data",
    description: "We are preparing the latest team and sales analytics for you.",
    label: "Loading",
  },
  info: {
    title: "Heads up",
    description: "This view is informational and updates in real time as activity changes.",
    label: "Info",
  },
};

function StatusIcon({ variant }: { variant: StatusVariant }) {
  if (variant === "loading") {
    return (
      <span
        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true"
      />
    );
  }

  const common = "h-6 w-6";

  switch (variant) {
    case "error":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 8v5" strokeLinecap="round" />
          <circle cx="12" cy="16.8" r="0.8" fill="currentColor" />
          <path d="M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" strokeLinejoin="round" />
        </svg>
      );
    case "success":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.2 2.3 2.4 4.8-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10.5v5" strokeLinecap="round" />
          <circle cx="12" cy="7.8" r="0.8" fill="currentColor" />
        </svg>
      );
    case "empty":
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 9h8M8 13h5" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function StatusPanel({
  variant,
  title,
  description,
  details,
  onRetry,
  primaryAction,
  secondaryAction,
  className,
  compact = false,
}: StatusPanelProps) {
  const copy = defaults[variant];
  const style = variantStyles[variant];
  const resolvedTitle = title ?? copy.title;
  const resolvedDescription = description ?? copy.description;

  return (
    <section
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={cn(
        "w-full rounded-2xl border p-5 shadow-sm transition-colors duration-200 sm:p-6",
        style.container,
        className
      )}
    >
      <div className={cn("flex items-start gap-4", compact && "gap-3")}> 
        <div
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-xl p-2.5 ring-1",
            style.badge,
            compact && "p-2"
          )}
        >
          <StatusIcon variant={variant} />
          <span className="sr-only">{copy.label}</span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={cn("text-base font-semibold tracking-tight sm:text-lg", style.title)}>{resolvedTitle}</h3>
          <p className={cn("mt-1 text-sm leading-6", style.description)}>{resolvedDescription}</p>

          {details ? (
            <pre className="mt-3 max-h-44 overflow-auto rounded-lg border border-black/5 bg-black/[0.03] p-3 text-xs text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
              {details}
            </pre>
          ) : null}

          {(onRetry || primaryAction || secondaryAction) && (
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Retry
                </button>
              )}

              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled}
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  {primaryAction.label}
                </button>
              )}

              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-transparent px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/70"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
