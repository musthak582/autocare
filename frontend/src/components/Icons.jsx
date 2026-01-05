
export const Logo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 20L60 30L60 80L40 70L40 20Z" fill="url(#grad1)" />
    <path d="M20 30L40 40L40 90L20 80L20 30Z" fill="url(#grad2)" />
    <circle cx="35" cy="45" r="3" fill="white" />
    <circle cx="50" cy="38" r="3" fill="white" />
    <defs>
      <linearGradient id="grad1" x1="40" y1="20" x2="60" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A21CAF" />
        <stop offset="1" stopColor="#E879F9" />
      </linearGradient>
      <linearGradient id="grad2" x1="20" y1="30" x2="40" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#701A75" />
        <stop offset="1" stopColor="#D946EF" />
      </linearGradient>
    </defs>
  </svg>
);

export const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
