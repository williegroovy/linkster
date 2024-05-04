'use client';

import { TextField } from '~/components/Fields';
import { Button } from '~/components/Button';
import { signIn } from 'next-auth/react';

export default function EmailSignIn() {

   const formAction = async (formData: FormData) => {
      const email = formData.get('email') as string;

      if(!email) {
         return;
      }

      console.log('email', email);
      await signIn('email', { email, callbackUrl: '/dashboard' }).catch(console.error)
   }

    return (
       <form action={formAction} className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
             label="Email address"
             name="email"
             type="email"
             autoComplete="email"
             required
          />
          {/*<TextField*/}
          {/*  label="Password"*/}
          {/*  name="password"*/}
          {/*  type="password"*/}
          {/*  autoComplete="current-password"*/}
          {/*  required*/}
          {/*/>*/}
          <div>
             <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Send login email<span aria-hidden="true" className={'ml-2'}>&rarr;</span>
            </span>
             </Button>
          </div>
       </form>
    );
}
