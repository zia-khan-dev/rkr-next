"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { MdLockOpen } from "react-icons/md";
import { Input, Switch, Button } from "antd";
import FormControl from "components/UI/FormControl/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { signUpSuccess } from "../../../redux/features/authSlice";
import { signUpFormElements } from "../../../components/form/form";
import renderInput from "../../../components/form/RenderInput";
import useCrud from "../../../library/hooks/useCrud";
import { COMMON_SIGN_UP_END_POINT } from "../../../settings/constant";

// Assuming signUpFormElements is imported here

export default function SignUpForm() {
  const dispatch = useDispatch();
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const { callApi, data } = useCrud(
    process.env.NEXT_PUBLIC_SERVER_API + COMMON_SIGN_UP_END_POINT,
    "POST",
    "/",
    "user added"
  );
  const onSubmit = (formData) => {
    const onSuccess = (data) => {
      const { user, access_token } = data?.data;
      dispatch(
        signUpSuccess({
          userId: user?.id,
          user,
          token: access_token,
          role: user?.user_type,
        })
      );
    };

    const onError = (error) => {
      // Handle error case
      console.error("Sign up error", error);
    };

    callApi(formData, onSuccess, onError);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpFormElements.map((element) => (
        <FormControl
          key={element.name}
          label={element.isRequired ? element.label + " *": element.label}
          htmlFor={element.name}
          error={
            errors[element.name] && (
              <span>
                {errors[element.name].message || `${element.label} is required`}
              </span>
            )
          }
        >
          <Controller
            name={element.name}
            control={control}
            rules={{
              required: element.isRequired && `${element.label} is required`,
              minLength: element.minLength && {
                value: element.minLength,
                message: element.minLengthMessage,
              },
              maxLength: element.maxLength && {
                value: element.maxLength,
                message: element.maxLengthMessage,
              },
              pattern: element.pattern && {
                value: element.pattern,
                message: element.patternMessage,
              },
              validate:
                element.name === "confirmPassword"
                  ? (value) => value === password || "Passwords do not match"
                  : undefined,
            }}
            render={({ field }) => renderInput(field, element.type)}
          />
        </FormControl>
      ))}
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: "100%" }}
      >
        <MdLockOpen />
        Register
      </Button>
    </form>
  );
}
