import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
};

export function InternalHero({ eyebrow, title, description, backHref, backLabel }: Props) {
  return (
    <header className="internal-hero">
      <div className="container internal-hero-inner">
        <p className="eyebrow"><span />{eyebrow}</p>
        <h1>{title}<span className="dot">.</span></h1>
        {description && <p className="internal-lead">{description}</p>}
        {backHref && (
          <Link className="internal-back" href={backHref}>
            <span aria-hidden="true">←</span> {backLabel || "Voltar"}
          </Link>
        )}
      </div>
    </header>
  );
}
