import Link from "next/link";

export default function CardLink({ href="#", title, text, img }) {
  return (
    <Link href={href} className="block card">
      {/* Aspect 16:9 con padding-top */}
      <div className="relative w-full pt-[56.25%] overflow-hidden rounded-t-[var(--radius)]">
        <img src={img} alt="" className="img-cover" />
      </div>
      <div className="p-4">
        <div className="h2 text-[18px]">{title}</div>
        {text && <p className="p mt-1 text-[var(--muted)]">{text}</p>}
      </div>
    </Link>
  );
}
