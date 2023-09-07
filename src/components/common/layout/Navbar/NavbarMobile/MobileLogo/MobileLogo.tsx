import React from 'react';

interface MobileLogoProps {
  src: string; // URL de la imagen del logo para móviles
  alt: string; // Texto alternativo para la imagen del logo
  width?: string; // Ancho opcional para el logo móvil
  height?: string; // Altura opcional para el logo móvil
}

const MobileLogo: React.FC<MobileLogoProps> = ({ src, alt, width = 'auto', height = 'auto' }) => {
  return (
    <img src={src} alt={alt} style={{ width, height }} />
  );
};

export default MobileLogo;
