import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import  nodemailer from 'nodemailer';

import { env } from "~/env";
import { db } from "~/server/db";

function html(params: { url: string; host: string }) {
  const { url } = params;

  // const escapedHost = host.replace(/\./g, '&#8203;.');
  // const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;

  // const brandColor = '#F26522';
  const color = {
    background: '#f9f9f9',
    text: '#667085',
    mainBackground: '#fff',
    buttonBackground: '#0061BB',
    buttonBorder: '#0061BB',
    buttonText: '#fff',
  };

  return `
      <body style="padding: 10px; background: ${color.background};">
        <table style="background: ${color.mainBackground}; max-width: 485px; padding: 40px 40px; margin: auto; border-radius: 10px; width: 100%; border: 0">
          <tr>
            <td align="center"
              style="padding: 10px 0 0 0; font-size: 22px; font-family: Open-Sans, sans-serif; color: black;">
              <strong>Sign in to Linkster.io</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 15px 0 0 0;">
               <h2>Linkster.io</h2>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 15px 0;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
                     <a 
                        href="${url}"
                        target="_blank"
                        style="font-size: 14px; font-family: Open-Sans, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 10px; padding: 7px 50px; display: inline-block; font-weight: bold;"
                      >
                        Sign in
                     </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center"
              style="padding: 0; font-size: 16px; line-height: 32px; font-family: Open-Sans, sans-serif; color: ${color.text};">
              <p>If you did not request this email you can safely ignore it. If you have any questions, please reach out to support@linkster.io</p>
            </td>
          </tr>
        </table>
      </body>
   `;
}
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      profile: {
        id: string;
        address: {
          street: string;
          city: string;
          state: string;
          postalCode: string;
        };
        onboarded: boolean;
        contractorProfile: {
          id: string;
          companyName: string;
          projects: Array<object>;
          subContractedProjects: Array<object>;
          profile: object;
          trades: Array<{
            id: string;
            tradeId: string;
            contractorId: string;
            trade: {
              id: string;
              name: string;
            }
          }>;
          serviceAreas: Array<{
            id: string;
            name: string;
            city: string;
            state: string;
            postalCode: string;
          }>
        }
        clientProfile: {
          id: string;
          companyName: string;
          projects: Array<object>;
          profile: object;
        }
      }
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const profile = await db.profile.findUnique({
         where: {
          userId: user.id,
        },
        include: {
          contractorProfile: {
            include: {
              serviceAreas: true,
              trades: {
                include: {
                  trade: true
                }
              },
            }
          },
          clientProfile: true,
        }
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          profile: profile,
        },
      }
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
     GoogleProvider({
       clientId: env.GOOGLE_CLIENT_ID,
       clientSecret: env.GOOGLE_CLIENT_SECRET,
     }),
     DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
     EmailProvider({
       server: env.EMAIL_SERVER,
       from: env.EMAIL_FROM,
       maxAge: 7 * 24 * 60 * 60, // 7 days
       async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
         const { host } = new URL(url);
         const transport = nodemailer.createTransport(server);
         const timestamp = Date.now();
         await transport.sendMail({
           to: email,
           from,
           subject: `Sign in to Thimble.io - ${timestamp}`,
           text: text({ url, host }),
           html: html({ url, host }),
         });
       },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
