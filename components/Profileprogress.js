"use client";

export default function ProgressCircle({ progress = 100, image }) {
  const stroke = 5;
  const radius = 50 - stroke; // based on viewBox (100)
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="position-relative w-100" style={{ maxWidth: 100 }}>

      {/* SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-100"
      >
        {/* Remaining */}
        <circle
          className="text-primary"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="50"
          cy="50"
        />

        {/* Progress */}
        <circle
          className="text-danger"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>

      {/* Center Image */}
      {image && (
        <img
          src={image}
          alt="profile"
          className="position-absolute top-50 start-50 translate-middle rounded-circle object-fit-cover"
          style={{
            width: "80%",
            height: "80%",
          }}
        />
      )}

      {/* Edit Button */}
      <div
        className="position-absolute bottom-0   rounded-circle d-flex align-items-center justify-content-center p-2"
        style={{
          width: "35%",
          height: "35%",
          border: "4px solid #fff7f7", 
          background:"#F4F4F4",
          right:"7px"
        }}
      >
        <img
          src="/assets/icons/Edit.svg"
          alt="edit"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}