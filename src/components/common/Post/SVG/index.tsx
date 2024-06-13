export function HeartIcon({ isFilled }: { isFilled?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 7.69428C10 2.99985 3 3.49985 3 9.49988C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49988C21 3.49985 14 2.99985 12 7.69428Z"
        fill={isFilled ? "#1DA1F2" : "none"}
        stroke="#1DA1F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
