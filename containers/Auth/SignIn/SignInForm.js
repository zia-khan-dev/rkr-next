import React, { useContext, Fragment } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { MdLockOpen } from "react-icons/md";
import { Input, Switch, Button } from "antd";
import FormControl from "components/UI/FormControl/FormControl";
import { AuthContext } from "context/AuthProvider";
import { FORGET_PASSWORD_PAGE } from "settings/constant";
import { FieldWrapper, SwitchWrapper, Label } from "../Auth.style";
import { signInSuccess } from "../../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signInFormElements, signInFormitems } from "../../../components/form/form";
import renderInput from "../../../components/form/RenderInput";
import useCrud from "../../../library/hooks/useCrud";
import { COMMON_SIGN_IN_END_POINT } from "../../../settings/constant";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { signIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const { callApi, data } = useCrud(
    process.env.NEXT_PUBLIC_SERVER_API + COMMON_SIGN_IN_END_POINT,
    "POST",
    "/",
    "user logged in"
  );
  const onSubmit = (formData) => {
    const onSuccess = (data) => {
      const { user, access_token } = data?.data;
      dispatch(
        signInSuccess({
          userId: user?.id,
          user,
          token: access_token,
          role: user?.user_type,
        })
      );
    };

    const onError = (error) => {
      // Handle error case
      console.error("Sign in error", error);
    };

    callApi(formData, onSuccess, onError);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signInFormElements.map((item) => (
        <FormControl
          key={item.name}
          label={item.isRequired ? item.label + " *": item.label}
          htmlFor={item.name}
          error={
            errors[item.name] && (
              <span>
                {errors[item.name].message || `${item.label} is required`}
              </span>
            )
          }
        >
          <Controller
            name={item.name}
            control={control}
            rules={{
              required: item.isRequired && `${item.label} is required`,
              minLength: item.minLength && {
                value: item.minLength,
                message: item.minLengthMessage,
              },
              maxLength: item.maxLength && {
                value: item.maxLength,
                message: item.maxLengthMessage,
              },
              pattern: item.pattern && {
                value: item.pattern,
                message: item.patternMessage,
              }
            }}
            render={({ field }) => renderInput(field, item.type)}
          />
        </FormControl>
      ))}
      <FieldWrapper>
        <Link href={FORGET_PASSWORD_PAGE}>
          <a>Forget Password ?</a>
        </Link>
      </FieldWrapper>
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: "100%" }}
      >
        <MdLockOpen />
        Login
      </Button>
    </form>
  );
}
