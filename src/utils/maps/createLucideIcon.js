import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { MapPin } from "lucide-react"; // Certifique-se de importar o MapIcon

export const createLucideIcon = (IconComponent = MapPin, iconSize = 40) => {
  const iconMarkup = renderToStaticMarkup(<IconComponent size={iconSize} />);
  const iconUrl = `data:image/svg+xml,${encodeURIComponent(iconMarkup)}`;

  return new L.Icon({
    iconUrl,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize], // Ajuste para alinhar o ícone corretamente
    popupAnchor: [0, -iconSize / 2], // Ajuste para alinhar o popup corretamente
  });
};
