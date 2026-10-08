export const DEFAULT_FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e0e7ff'/%3E%3Cg fill='%236366f1'%3E%3Cpath d='M200 110l-45 25v50l45 25 45-25v-50z' opacity='0.8'/%3E%3Ccircle cx='200' cy='150' r='18' fill='%234338ca'/%3E%3C/g%3E%3Ctext x='200' y='230' font-family='sans-serif' font-size='16' font-weight='bold' fill='%234338ca' text-anchor='middle'%3EBizBridge Listing%3C/text%3E%3C/svg%3E";

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== DEFAULT_FALLBACK_IMAGE) {
    target.src = DEFAULT_FALLBACK_IMAGE;
  }
};
