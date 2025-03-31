"use client";

import React from 'react';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';

const SignupPage = () => {
  const { user } = useAuth();

  // Redirect if already authenticated
  if (user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm />
    </div>
  );
};

export default SignupPage;