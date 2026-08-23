import type { Article } from '~/mocks/articles'

export interface IDestaqueUnicoProps {
	/** O conteúdo escolhido manualmente pelo editor no admin (RN04). */
	article: Article
	/**
	 * Patrocinador — opcional (RN05). Preenchido, renderiza a SponsorLine
	 * ("Conteúdo Patrocinado" + nome); vazio, a linha não existe.
	 */
	sponsor?: string
	sponsorHref?: string
	className?: string
}
