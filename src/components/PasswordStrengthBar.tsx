type PasswordStrengthBarProps = {
  password: string;
};

const getPasswordStrength = (password: string) => {
  let strength = "Schwach";
  const length = password.length;

  if (length < 6) {
    return "Zu Schwach";
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const conditionsMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  if (conditionsMet >= 2 && length >= 8) strength = "Mittel";
  if (conditionsMet >= 3 && length >= 10) strength = "Gut";
  if (conditionsMet === 4 && length >= 12) strength = "Stark";

  return strength;
};

const strengthColors: Record<string, string> = {
  Schwach: "bg-red w-1/4",
  Mittel: "bg-orange w-2/4",
  Gut: "bg-yellow w-3/4",
  Stark: "bg-green w-full",
};

const strengthTextColors: Record<string, string> = {
  Schwach: "text-red",
  Mittel: "text-orange",
  Gut: "text-yellow",
  Stark: "text-green",
};

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  password,
}) => {
  const strength = getPasswordStrength(password);

  return (
    <div className="w-full flex items-center justify-between gap-4 mt-2 px-2">
      <div className="h-2 grow w-full bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthColors[strength]}`}
        />
      </div>
      <div
        className={`text-sm font-bold text-nowrap
          ${strengthTextColors[strength]}
        `}
      >
        {strength}
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
