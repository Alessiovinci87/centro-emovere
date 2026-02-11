import Image from "next/image";
import Link from "next/link";

export default function FeatureCard({ href = "#", title, subtitle, image }) {
  return (
    <Link href={href} className="card overflow-hidden no-underline">
      <Image
        src={image}
        alt={title}
        width={1280}
        height={720}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-full h-auto object-cover block"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h3>
        {subtitle && <p className="caption">{subtitle}</p>}
      </div>
    </Link>
  );
}
