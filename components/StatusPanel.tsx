import React from "react";

type StatusState = "empty" | "error" | "complete" | "loading";

type StatusPanelProps = {
  state: StatusState;
  title?: string;
  description?: string;
  details?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  children?: React.ReactNode;
};

type StateConfig = {
  accent: string;
  bg: string;
  border: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function joinClassNames(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function getStateConfig(state: StatusState): StateConfig {
  switch (state) {
    case "error":
      return {
        accent: "#ef4444",
        bg: "#fef2f2",
        border: "#fecaca",
        title: "Something went wrong",
        description:
          "We hit an issue while loading this section. Please retry or check your connection.",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 8V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 16.5H12.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      };
    case "complete":
      return {
        accent: "#16a34a",
        bg: "#f0fdf4",
        border: "#bbf7d0",
        title: "All set",
        description: "This workflow is complete. Your latest data has been processed successfully.",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 7L9 18l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      };
    case "loading":
      return {
        accent: "#2563eb",
        bg: "#eff6ff",
        border: "#bfdbfe",
        title: "Loading data",
        description: "We are preparing your latest team, pipeline, and analytics information.",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" opacity="0.25" />
            <path
              d="M20 12a8 8 0 0 0-8-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
      };
    case "empty":
    default:
      return {
        accent: "#475569",
        bg: "#f8fafc",
        border: "#e2e8f0",
        title: "No data yet",
        description:
          "There is nothing to display in this view right now. Create leads, log activity, or adjust filters.",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M7 9H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M7 13H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      };
  }
}

export default function StatusPanel({
  state,
  title,
  description,
  details,
  actionLabel,
  actionHref,
  className,
  children,
}: StatusPanelProps) {
  const config = getStateConfig(state);
  const resolvedTitle = title ?? config.title;
  const resolvedDescription = description ?? config.description;

  return (
    <section
      role="status"
      aria-live={state === "error" ? "assertive" : "polite"}
      className={joinClassNames("status-panel", className)}
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 14,
        padding: "1rem",
        display: "grid",
        gap: "0.75rem",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          aria-hidden="true"
          style={{
            color: config.accent,
            width: 38,
            height: 38,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,0.75)",
            border: `1px solid ${config.border}`,
            flexShrink: 0,
          }}
        >
          {config.icon}
        </div>

        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "1rem",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {resolvedTitle}
          </h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              color: "#334155",
              fontSize: "0.92rem",
              lineHeight: 1.5,
            }}
          >
            {resolvedDescription}
          </p>
        </div>
      </div>

      {details ? (
        <p
          style={{
            margin: 0,
            color: "#475569",
            fontSize: "0.86rem",
            lineHeight: 1.5,
            background: "rgba(255,255,255,0.7)",
            borderRadius: 10,
            padding: "0.625rem 0.75rem",
            border: `1px dashed ${config.border}`,
            whiteSpace: "pre-wrap",
          }}
        >
          {details}
        </p>
      ) : null}

      {children ? <div>{children}</div> : null}

      {actionLabel && actionHref ? (
        <div>
          <a
            href={actionHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#0f172a",
              border: `1px solid ${config.border}`,
              background: "#ffffff",
              padding: "0.55rem 0.8rem",
              borderRadius: 10,
            }}
          >
            {actionLabel}
          </a>
        </div>
      ) : null}
    </section>
  );
}
