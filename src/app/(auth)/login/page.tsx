import Link from 'next/link'
import { Button } from '~/components/Button'
import { TextField } from '~/components/Fields'
import { Logo } from '~/components/Logo'
import { SlimLayout } from '~/components/SlimLayout'
import { type Metadata } from 'next'
import GoogleSignIn from '~/components/GoogleSignIn';
import GitHubSignIn from '~/components/GitHubSignIn';
import EmailSignIn from '~/components/EmailSignIn';

export const metadata: Metadata = {
  title: 'Sign In',
}


export default function Login() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>{' '}
        for a free trial.
      </p>
       <EmailSignIn />
       <div>
          <div className="relative mt-10">
             <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
             </div>
             <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or continue with</span>
             </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
             <GoogleSignIn />
             <GitHubSignIn />
          </div>
       </div>

       <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Start a 14 day free trial
          </a>
       </p>
    </SlimLayout>
  )
}
