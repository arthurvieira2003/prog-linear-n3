"use client";

import React from "react";

export default function StarRating({
  value,
  maxStars = 5,
  size = "md",
  label,
}) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const starsValue = (normalizedValue / 100) * maxStars;
  const fullStars = Math.floor(starsValue);
  const hasHalfStar = starsValue % 1 >= 0.25 && starsValue % 1 < 0.75;
  const hasThreeQuarterStar = starsValue % 1 >= 0.75;
  const emptyStars =
    maxStars - fullStars - (hasHalfStar || hasThreeQuarterStar ? 1 : 0);
  const starSize =
    {
      sm: 16,
      md: 20,
      lg: 24,
    }[size] || 20;

  return (
    <div className="flex items-center">
      {label && <div className="text-xs text-gray-400 mr-2">{label}</div>}
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg
            key={`full-${i}`}
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="#FBBF24"
            className="mr-0.5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="#FBBF24"
            className="mr-0.5"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fillOpacity="0.4"
            />
            <path d="M12 2v15.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2z" />
          </svg>
        )}

        {hasThreeQuarterStar && (
          <svg
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="#FBBF24"
            className="mr-0.5"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fillOpacity="0.4"
            />
            <path d="M12 2v15.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2z" />
            <path d="M15 9.24l-3-.25V2 15.27l3.18 1.92-.91-3.89L15 9.24z" />
          </svg>
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg
            key={`empty-${i}`}
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="#4B5563"
            className="mr-0.5"
            fillOpacity="0.4"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}

        <span className="ml-1 text-xs text-gray-300">{value}</span>
      </div>
    </div>
  );
}
