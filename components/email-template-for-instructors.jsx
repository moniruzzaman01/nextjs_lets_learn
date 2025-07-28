export default function EmailTemplateForInstructor({
  studentName,
  courseTitle,
  enrollmentDate,
  totalStudents,
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
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "#4f46e5",
            marginBottom: "0.5rem",
          }}
        >
          🎓 New Student Enrollment
        </h1>
        <p style={{ color: "#6b7280" }}>Your course is growing!</p>
      </div>
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
          <div style={{ display: "flex", marginBottom: "0.75rem" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Student Name:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {studentName}
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "0.75rem" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>Course:</div>
            <div
              style={{
                width: "66.666667%",
                fontWeight: "500",
                color: "#4f46e5",
              }}
            >
              {courseTitle}
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "0.75rem" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Enrollment Date:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {enrollmentDate}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ width: "33.333333%", color: "#6b7280" }}>
              Total Students:
            </div>
            <div style={{ width: "66.666667%", fontWeight: "500" }}>
              {totalStudents}
            </div>
          </div>
        </div>
      </div>
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
          Recommended Actions
        </h3>
        <ol
          style={{
            listStyleType: "decimal",
            listStylePosition: "inside",
            color: "#374151",
          }}
        >
          <li>Welcome the student with a personal message</li>
          <li>Review your course materials for upcoming sessions</li>
          <li>Check student's profile for any special requirements</li>
          <li>Update your course progress metrics</li>
        </ol>
      </div>
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
          Go to Course Dashboard
        </a>
      </div>
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
