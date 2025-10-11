"use client"

import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signInWithEmail } from '@/lib/actions/auth.actions'

const SignIn = () => {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result) {
        router.push('/')
        return;
      }

    }
    catch (error) {
      console.error(error);
      toast.error("Sign-in failed", {
        description: error instanceof Error ? error.message : "Please try again later."
      });
    }
  }
  return (
    <>
      <h1 className='form-title'>Sign In Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputField 
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Email is invalid" } } }
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 } }
        />

        <button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

      </form>
      <FooterLink href="/sign-up" text="Don't have an account?" linkText="Sign Up" />
    </>
  )
}

export default SignIn
