const getPasswordStrength = (password: string) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars) {
    return "strong";
  } else if (hasLowerCase && hasUpperCase && hasNumbers) {
    return "great";
  } else if ((hasLowerCase && hasUpperCase) || (hasLowerCase && hasNumbers)) {
    return "medium";
  } else if (hasLowerCase) {
    return "weak";
  } else {
    return "default";
  }
};

const PasswordStrengthBar = ({ password }: { password: string }) => {
  const strength = getPasswordStrength(password);

  const strengthLabel = {
    default: "Schwach",
    weak: "Schwach",
    medium: "Mittel",
    great: "Gut",
    strong: "Stark!",
  }[strength];

  return (
    <div className="flex items-center gap-4 mt-2 px-2">
      <div className="h-2 w-full bg-inactive rounded-full">
        <div
          className={`bar duration-500 h-full rounded-full ${strength}`}
        ></div>
      </div>
      <span className={`text-sm font-bold ${strength}`}>{strengthLabel}</span>

      <style>{`
        .bar.default {
          width: 10%;
          background-color: var(--color-red);
        }
        .default {
          color: var(--color-red);
        }
        .bar.weak {
          width: 30%;
          background-color: var(--color-red);
        }
        .weak {
          color: var(--color-red);
        }
        .bar.medium {
          width: 50%;
          background-color: var(--color-orange);
        }
        .medium {
          color: var(--color-orange);
        }
        .bar.great {
          width: 70%;
          background-color: var(--color-yellow);
        }
        .great {
          color: var(--color-yellow);
        }
        .bar.strong {
          width: 100%;
          background-color: var(--color-green);
        }
        .strong {
          color: var(--color-green);
        }
      `}</style>
    </div>
  );
};

export default PasswordStrengthBar;
