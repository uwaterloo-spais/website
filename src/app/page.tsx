import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Teams from "@/components/home/Teams";
import ProjectTeaser from "@/components/home/ProjectTeaser";
import Community from "@/components/home/Community";
import Partners from "@/components/home/Partners";
import Join from "@/components/home/Join";
import { formatDate, getUpdates } from "@/lib/updates";

export default function Home() {
  const updates = getUpdates().map((u) => ({ ...u, dateLabel: formatDate(u.date) }));
  const farm = updates.find((u) => u.slug.includes("hoffmans"));
  const farmAlbum = farm && { title: farm.albumTitle, source: farm.source, photos: farm.photos };

  return (
    <>
      <Hero farmAlbum={farmAlbum} />
      <Mission />
      <Teams />
      <ProjectTeaser />
      <Community updates={updates} />
      <Partners />
      <Join />
    </>
  );
}
