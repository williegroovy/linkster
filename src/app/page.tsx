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
import BetaCard from '~/components/BetaCard';

export default async function Home() {
   const session = await getServerAuthSession();

   const signedIn = !!session?.user;
  return (
    <>
      <Header signedIn={signedIn} />
      <main>
         <Hero />
         <PrimaryFeatures />
         {/*<SecondaryFeatures />*/}
         {/*<BetaCard />*/}
         {/*<CallToAction />*/}
         {/*<Testimonials />*/}
         <Pricing />
         <Faqs />
      </main>
      <Footer />
    </>
  )
}
