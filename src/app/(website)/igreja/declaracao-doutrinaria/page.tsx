import type { Metadata } from "next";
import Link from "next/link";
import styles from "./doctrine.module.css";

const SOURCE_URL = "https://www.convencaobatista.com.br/site/pagina.php?MEN_ID=22";

export const metadata: Metadata = {
  title: "O que Cremos | Igreja Batista do Marapé",
  description: "Conheça os temas da Declaração Doutrinária da Convenção Batista Brasileira e consulte o documento oficial.",
};

const articles = [
  "Escrituras Sagradas",
  "Deus",
  "O Homem",
  "O Pecado",
  "Salvação",
  "Eleição",
  "Reino de Deus",
  "Igreja",
  "O Batismo e a Ceia do Senhor",
  "O Dia do Senhor",
  "Ministério da Palavra",
  "Mordomia",
  "Evangelização e Missões",
  "Educação Religiosa",
  "Liberdade Religiosa",
  "Ordem Social",
  "Família e casamento",
  "Morte",
  "Justos e Ímpios",
] as const;

function roman(value: number) {
  const tokens: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let remaining = value;
  let result = "";
  for (const [amount, symbol] of tokens) {
    while (remaining >= amount) {
      result += symbol;
      remaining -= amount;
    }
  }
  return result;
}

export default function DoctrinePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>IDENTIDADE E FÉ</p>
          <h1>O que cremos<span className={styles.blue}>.</span></h1>
          <p className={styles.subtitle}>
            Conheça os fundamentos doutrinários apresentados na Declaração
            Doutrinária da Convenção Batista Brasileira.
          </p>
          <a className={styles.heroLink} href="#artigos">
            Explorar os artigos <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className={styles.introduction}>
        <div className={`container ${styles.introGrid}`}>
          <div>
            <p className={styles.label}>DECLARAÇÃO DOUTRINÁRIA</p>
            <h2>Fé fundamentada nas Escrituras.</h2>
          </div>
          <div>
            <p>
              Este índice apresenta os temas da Declaração Doutrinária da Convenção
              Batista Brasileira, organizada em 19 artigos e acompanhada de referências bíblicas.
            </p>
            <p>
              Para a leitura do texto integral, consulte a publicação oficial da CBB.
            </p>
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              Ler declaração completa na CBB <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.articlesSection} id="artigos" aria-labelledby="articles-heading">
        <div className="container">
          <p className={styles.label}>DOCUMENTO OFICIAL</p>
          <h2 id="articles-heading">Os 19 artigos<span className={styles.blue}>.</span></h2>
          <ol className={styles.articles}>
            {articles.map((article, index) => (
              <li key={article}>
                <span className={styles.number}>{roman(index + 1)}</span>
                <span className={styles.name}>{article}</span>
                <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer"
                  aria-label={`Consultar artigo ${roman(index + 1)} — ${article} no documento oficial da CBB`}
                  className={styles.articleAction}>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
          <p className={styles.note}>
            Os títulos são apresentados como índice de consulta. O conteúdo integral, suas
            notas e referências bíblicas devem ser lidos na fonte oficial.
          </p>
        </div>
      </section>

      <section className={styles.closing}>
        <div className="container">
          <p className={styles.label}>CONTINUE CONHECENDO A IBM</p>
          <h2>Uma igreja viva adorando ao Deus vivo.</h2>
          <Link href="/igreja" className={styles.closingLink}>
            Quem somos <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
