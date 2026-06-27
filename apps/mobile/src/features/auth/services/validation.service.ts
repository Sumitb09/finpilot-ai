export function validateRegister(data: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
  }) {
    if (!data.fullName.trim()) {
      return "Please enter your full name.";
    }
  
    if (!data.phone.trim()) {
      return "Please enter your phone number.";
    }
  
    if (!/^\+[1-9]\d{7,14}$/.test(data.phone)) {
      return "Invalid phone number.";
    }
  
    if (!data.email.trim()) {
      return "Please enter your email.";
    }
  
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      return "Invalid email address.";
    }
  
    if (data.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
  
    if (
      data.password !== data.confirmPassword
    ) {
      return "Passwords do not match.";
    }
  
    if (!data.acceptedTerms) {
      return "Please accept the Terms & Privacy Policy.";
    }
  
    return null;
  }