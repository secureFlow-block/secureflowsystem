
const Logo = () => (
    <div className="flex items-center gap-2">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 5L30 15L20 25L10 15L20 5Z" stroke="currentColor" className="text-secondary" strokeWidth="2"/>
        <path d="M20 15L30 25L20 35L10 25L20 15Z" stroke="currentColor" className="text-primary" strokeWidth="2"/>
      </svg>
      <span className="text-2xl font-bold">SecureFlow</span>
    </div>
  );

export default Logo;
