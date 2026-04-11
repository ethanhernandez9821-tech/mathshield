import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  hrefBase?: string;
  category?: string;
  status?: "live" | "planned";
};

export default function GameCard({
  slug,
  title,
  description,
  thumbnail,
  hrefBase = "/arcade",
  category = "arcade",
  status = "planned",
}: Props) {
  return (
    <Link href={`${hrefBase}/${slug}`} className="poster-card">
      <div className="poster-media">
        <Image src={thumbnail} alt={title} fill className="object-cover" unoptimized />
        <div className="poster-overlay" />
      </div>

      <div className="poster-body">
        <div className="poster-topline">
          <span className="poster-chip">{category}</span>
          <span className={`poster-action ${status === "live" ? "poster-action--live" : ""}`}>
            {status === "live" ? "Play now" : "Coming soon"}
          </span>
        </div>
        <h2 className="poster-title">{title}</h2>
        <p className="poster-description">{description}</p>
      </div>
    </Link>
  );
}
