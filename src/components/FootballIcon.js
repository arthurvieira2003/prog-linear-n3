"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

export default function FootballIcon({
  size = "lg",
  color = "currentColor",
  className = "",
}) {
  return (
    <FontAwesomeIcon
      icon={faFutbol}
      size={size}
      style={{ color }}
      className={className}
      spin={false}
      pulse={false}
    />
  );
}
