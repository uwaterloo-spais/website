import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Events from "@/components/home/Events";
import Teams from "@/components/home/Teams";
import Partners from "@/components/home/Partners";
import Join from "@/components/home/Join";
import { formatDate, getUpdates } from "@/lib/updates";

export default function Home() {
  const updates = getUpdates().map((u) => ({ ...u, dateLabel: formatDate(u.date) }));

  return (
    <>
      <Hero />
      <Mission />
      <Events updates={updates} />
      <Teams />
      <Partners />
      <Join />
    </>
  );
}
