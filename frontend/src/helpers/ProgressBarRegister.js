import styles from "../Pages/RegisterPage/RegisterPage.module.css";

const strength = {
  1: "słabe",
  2: "średnie",
  3: "mocne",
};

const getPasswordStrength = (password, strengthValue) => {
  strengthValue.upper = /[A-Z]/.test(password);
  strengthValue.lower = /[a-z]/.test(password);
  strengthValue.numbers = /\d/.test(password);

  let strengthIndicator = 0;

  for (let metric in strengthValue) {
    if (strengthValue[metric] === true) {
      strengthIndicator++;
    }
  }

  return strength[strengthIndicator] ?? "";
};

const getStrength = (password) => {
  let strengthValue = {
    upper: false,
    numbers: false,
    lower: false,
  };

  return getPasswordStrength(password, strengthValue);
};

export const handleChange = (register, bars, strengthDiv) => {
  let password = register;

  const strengthText = getStrength(password);

  bars.current.className = "";

  if (strengthText) {
    strengthDiv.current.innerText = `${strengthText} hasło`;

    bars.current.classList.add(styles[strengthText]);
  } else {
    strengthDiv.innerText = "";
  }
};
