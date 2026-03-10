import React from "react";

export type UserRole = "admin" | "user";

export interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const roleStyles: Record<UserRole, React.CSSProperties> = {
  admin: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
  },
  user: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
};

export function UserCard({ name, email, avatarUrl, role }: UserCardProps): React.JSX.Element {
  const initials = getInitials(name);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        maxWidth: "360px",
        width: "100%",
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          aria-label={`${name}'s initials`}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#6366f1",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "16px",
            flexShrink: 0,
            userSelect: "none",
          }}
        >
          {initials}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2px",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "15px",
              color: "#111827",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
          <span
            style={{
              ...roleStyles[role],
              fontSize: "11px",
              fontWeight: 600,
              padding: "1px 8px",
              borderRadius: "9999px",
              textTransform: "capitalize",
              flexShrink: 0,
            }}
          >
            {role}
          </span>
        </div>
        <span
          style={{
            fontSize: "13px",
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          {email}
        </span>
      </div>
    </div>
  );
}
