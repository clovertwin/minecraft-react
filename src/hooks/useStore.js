import create from "zustand";
import { nanoid } from "nanoid";

// Helper function to get item from local storage
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));

// Helper to set item in local storage
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((setter) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    setter((prev) => ({
      cubes: [
        ...prev.cubes,
        { key: nanoid(), pos: [x, y, z], texture: prev.texture },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    setter((prev) => {
      return {
        cubes: prev.cubes.filter((cube) => {
          const [posX, posY, posZ] = cube.pos;
          return x !== posX || y !== posY || z !== posZ;
        }),
      };
    });
  },
  setTexture: (texture) => {
    setter(() => ({ texture }));
  },
  saveWorld: () => {
    setter((prev) => {
      setLocalStorage("cubes", prev.cubes);
    });
  },
  resetWorld: () => {
    setter(() => ({ cubes: [] }));
  },
}));
