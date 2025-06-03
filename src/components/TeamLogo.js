import Image from "next/image";
import { useState, useEffect } from "react";
import FootballIcon from "./FootballIcon";

export default function TeamLogo({ team, size = 40 }) {
  const [imgError, setImgError] = useState(false);
  const [imageUrl, setImageUrl] = useState(team.escudo);

  useEffect(() => {
    const url = team.escudo;

    if (url.includes(".svg") && !url.endsWith(".png")) {
      setImageUrl(`${url}?width=${size * 2}`);
    } else {
      setImageUrl(url);
    }
  }, [team.escudo, size]);

  if (imgError) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: team.cor || "#333333",
          color: team.corSecundaria || "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title={team.nome}
      >
        <FootballIcon
          size={size <= 24 ? "sm" : size <= 40 ? "lg" : "2x"}
          color={team.corSecundaria || "#ffffff"}
        />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <Image
        src={imageUrl}
        alt={`Escudo do ${team.nome}`}
        width={size}
        height={size}
        onError={() => setImgError(true)}
        style={{
          objectFit: "contain",
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        unoptimized={true}
      />
    </div>
  );
}
