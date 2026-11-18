import Link from "next/link";

type Props = { title: string; description: string };

export function EmptyContent({ title, description }: Props) {
  return (
    <div className="internal-empty" role="status">
      <p className="eyebrow dark"><span /> EM PREPARAÇÃO</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href="/" className="internal-text-link">Voltar ao início <span aria-hidden="true">↗</span></Link>
    </div>
  );
}
