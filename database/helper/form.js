export const signUpFormElements = [
    {
      name: "username",
      label: "Username",
      type: "text",
      isRequired: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      isRequired: true,
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      patternMessage: "Please enter a valid email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      isRequired: true,
      minLength: 6,
      minLengthMessage: "Password must be at least 6 characters",
      maxLength: 20,
      maxLengthMessage: "Password must not be longer than 20 characters",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      isRequired: true,
    },
    {
      name: "rememberMe",
      label: "Remember Me",
      type: "checkbox",
    },
    {
      name: "termsAndConditions",
      label: "I agree with terms and conditions",
      type: "checkbox",
      isRequired: true,
    },
  ];
  