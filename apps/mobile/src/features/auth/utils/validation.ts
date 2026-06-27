export function validateName(name: string) {
    return name.trim().length >= 2;
  }
  
  export function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export function validatePassword(password: string) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  }
  
  export function passwordsMatch(
    password: string,
    confirm: string
  ) {
    return password === confirm;
  }

