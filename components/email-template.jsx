export default function EnrollmentConfirmationEmail({
  studentName,
  courseName,
  instructorName,
  startDate,
  courseDuration,
  supportEmail = "moniruzzamanshakib04@gmail.com",
}) {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        maxWidth: "42rem",
        margin: "0 auto",
        backgroundColor: "white",
        padding: "2rem",
        lineHeight: "1.5",
        color: "#333",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "#4f46e5",
            marginBottom: "0.5rem",
          }}
        >
          🎉 Congratulations!
        </h1>
        <p style={{ color: "#6b7280" }}>Your enrollment has been confirmed</p>
      </div>

      {/* Main Content */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
        >
          Enrollment Details
        </h2>

        <div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Student Name:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {studentName}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>Course:</div>
            <div
              style={{
                width: "66.666667%",
                fontWeight: "500",
                color: "#4f46e5",
              }}
            >
              {courseName}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Instructor:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {instructorName}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Start Date:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {startDate}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Duration:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {courseDuration}
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div
        style={{
          backgroundColor: "#eef2ff",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#4338ca",
            marginBottom: "0.75rem",
          }}
        >
          What's Next?
        </h3>
        <ol
          style={{
            listStyleType: "decimal",
            listStylePosition: "inside",
            color: "#374151",
          }}
        >
          <li>Check your dashboard for course materials</li>
          <li>Join the course community forum</li>
          <li>Mark your calendar for the start date</li>
          <li>Prepare any required materials</li>
        </ol>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <a
          href="#"
          style={{
            display: "inline-block",
            backgroundColor: "#4f46e5",
            color: "white",
            fontWeight: "500",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
          }}
        >
          Access Your Course
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: "0.875rem",
          color: "#6b7280",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1.5rem",
        }}
      >
        <p style={{ marginBottom: "0.5rem" }}>
          Need help? Contact us at{" "}
          <a
            href={`mailto:${supportEmail}`}
            style={{ color: "#4f46e5", textDecoration: "none" }}
          >
            {supportEmail}
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} Your Learning Platform. All rights
          reserved.
        </p>
        <p>
          Developed by - <b>MZS</b>
        </p>
      </div>
    </div>
  );
}
