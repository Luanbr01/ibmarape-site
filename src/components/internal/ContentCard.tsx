import Link from "next/link";

type Props = {
  href: string;
  title: string;
  cover?: string;
  eyebrow?: string;
  description?: string;
  action?: string;
};

export function ContentCard({ href, title, cover, eyebrow, description, action = "Explorar" }: Props) {
  return (
    <Link href={href} className="internal-card" data-reveal>
      <div className="internal-card-media" style={cover ? { backgroundImage: `url("${cover}")` } : undefined}>
        {!cover && <span className="internal-image-placeholder" aria-hidden="true">IBM</span>}
      </div>
      <div className="internal-card-content">
        {eyebrow && <span className="internal-card-kicker">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <span className="internal-card-action">{action} <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
}
