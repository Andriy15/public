import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from '../../../shared/notifyError'
import { notifySuccess } from "../../../shared/notifySuccess";
import { getError } from "../auth.module";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUp() {
  const { handleSubmit, register, formState: { errors }, getValues,} = useForm<SignUpForm>()

  const navigate = useNavigate()

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
  
      if (response.error) {
        notify(response.error.message)
      } else {
        notifySuccess('Check your email for confirmation')
      }
      navigate('/')

    } catch (error: any) {
      console.error("Sign up error:", error.message);
    }
  }
  

  return (
    <Container maxWidth="xs" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          type="email"
          {...register("email", { required: true, pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ })}
          variant="outlined"
          margin="normal"
          label="Email"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.email && (<span className="text-red-600">{getError('email', errors)}</span>)}
        <TextField
          id="password"
          type="password"
          {...register("password", { required: true, minLength: 8 })}
          variant="outlined"
          margin="normal"
          label="Password"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.password && (<span className="text-red-600">{getError('password', errors)}</span>)}
        <TextField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === getValues().password || "Passwords do not match",
          })}
          variant="outlined"
          margin="normal"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{getError('confirmPassword', errors)}</span>
        )}
        <Button type="submit" variant="text" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>

      <ToastContainer />

    </Container>
  )
}
