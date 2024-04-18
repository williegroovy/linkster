import { CallToAction } from '~/components/CallToAction'
import { Faqs } from '~/components/Faqs'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Hero } from '~/components/Hero'
import { Pricing } from '~/components/Pricing'
import { PrimaryFeatures } from '~/components/PrimaryFeatures'
import { SecondaryFeatures } from '~/components/SecondaryFeatures'
import { Testimonials } from '~/components/Testimonials'
import { getServerAuthSession } from '~/server/auth'

export default async function Home() {
   const session = await getServerAuthSession();

   const signedIn = !!session?.user;
  return (
    <>
      <Header signedIn={signedIn} />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
