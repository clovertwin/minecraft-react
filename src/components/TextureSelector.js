import { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../images/images";
import "../index.css";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setActiveTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, grass, glass, wood, log };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setActiveTexture(pressedTexture[0]);
    }
  }, [setActiveTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-select">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              alt={k}
              src={src}
              className={`${k === activeTexture ? "active" : ""}`}
            />
          );
        })}
      </div>
    )
  );
};
