"use client"

import { CountrySelectField } from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import { INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'
import React from 'react'
import { useForm } from 'react-hook-form'


const SignUp = () => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    control
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: 'Shaik Munawar',
      email: '',
      password: '',
      country: 'India',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Form Data:", data);
      // Add your sign-up logic here, e.g., API call to register the user
    }
    catch (error) {
      console.error("Sign-up error:", error);
    }
  }

  return (
    <div>
      <h1 className='form-title'>Sign-up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputField
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is required", minLength: 5 } }
        />
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

        <CountrySelectField 
        name="country"
        label="Country"
        control={control}
        error={errors.country}
        required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk tolerance"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        

        <button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

      </form>

      <FooterLink href="/sign-in" text="Already have an account?" linkText="Sign In" />
    </div>
  )
}

export default SignUp
