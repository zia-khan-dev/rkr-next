export const signUpFormElements = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    isRequired: true, // Adjust based on your application's requirements
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    isRequired: true, // Adjust based on your application's requirements
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
    maxLengthMessage: "Password must not exceed 20 characters",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    isRequired: true,
  },

  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    isRequired: false, // Adjust based on your application's requirements
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    isRequired: false, // Adjust based on your application's requirements
  },
  {
    name: "userType",
    label: "I'm a Host",
    type: "checkbox",
  },
];
export const signInFormElements = [
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
    maxLengthMessage: "Password must not exceed 20 characters",
  },
];
