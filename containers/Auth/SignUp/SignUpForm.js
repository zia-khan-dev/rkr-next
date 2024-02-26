import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { useDispatch } from 'react-redux'; 
import { signUpSuccess } from '../../../redux/features/authSlice';
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { signUpFormElements } from '../../../database/helper/form';
import renderInput from '../../../components/form/RenderInput';

// Assuming signUpFormElements is imported here

export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { control, watch, formState: { errors }, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const onSubmit = (data) => {
    dispatch(signUpSuccess(data));
    Swal.fire({
      icon: "success",
      title: "Congrats",
      text: 'Sign up successfully!',
    }).then(() => {
      router.push("/");
    });
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpFormElements.map((element) => (
        <FormControl
          key={element.name}
          label={element.label}
          htmlFor={element.name}
          error={
            errors[element.name] && (
              <span>{errors[element.name].message || `${element.label} is required`}</span>
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
              validate: element.name === 'confirmPassword' ? (value) => value === password || "Passwords do not match" : undefined,
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
        style={{ width: '100%' }}
      >
        <MdLockOpen />
        Register
      </Button>
    </form>
  );
}
