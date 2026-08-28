import { twMerge } from '~/lib/tw-merge'
import { Icon } from '~/components/icon'
import { SubscribeButton } from '~/components/subscribe-button'
import type { INewsletterCardProps } from './types'

/**
 * Componente: Newsletter Card
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8060-4432
 * Variantes: idle | pending | subscribed
 * Casca própria. Até 24/08/2026 isto era montado sobre um `Card` genérico (shadcn:
 * Card/CardHeader/CardContent/CardFooter). O wrapper saiu porque este era seu único
 * consumidor e porque quase toda decisão dele vinha sobrescrita aqui — gap, padding
 * vertical, sombra e alinhamento do rodapé. Sobravam a casca (borda + raio + fundo) e a
 * tipografia de título e descrição, que agora vivem direto neste arquivo.
 * Divergência deliberada do Figma: lá o card tem altura fixa (284px) com o rodapé colado na
 * base (flex-1 + justify-end); aqui o rodapé segue o fluxo normal, direto após a descrição
 * (truncada em 4 linhas) — com altura fixa, descrições mais curtas que o placeholder do
 * Figma abriam um vão grande entre texto e botão, já que o rodapé sempre empurrava para a
 * base do card.
 * Falha ao assinar não é um estado visual do card — quem usa o componente faz rollback pra
 * "idle" e avisa por toast com ação "Repetir" (ver NewsletterPane em
 * dashboard-perfil-v4), mesmo padrão do toggle de favoritos.
 * "subscribed" é terminal — o componente não expõe caminho de volta a idle nem controle de
 * cancelamento.
 * Os três estados do rodapé saíram daqui em 28/08/2026: eram um Button + dois chips
 * montados à mão, e viraram o `SubscribeButton` (src/components/subscribe-button), que
 * o banner de newsletter também usa. Sem layout novo — o card só deixou de ser o dono
 * de uma interação que se repete em outra superfície.
 * Tokens: --color-primary-600, --color-neutral-100, --color-neutral-600, --color-secondary-50,
 *         --color-secondary-950, --text-title-lg, --text-body-md, --text-body-lg
 */
export function NewsletterCard({ id, title, description, state = 'idle', onSubscribe, className }: INewsletterCardProps) {
	const isSubscribed = state === 'subscribed'

	return (
		<div
			id={id}
			className={twMerge('flex flex-col rounded-lg border border-neutral-100 bg-white w-full', className)}
		>
			<div className="flex flex-col pt-6 px-6">
				<Icon name={isSubscribed ? 'mark-email-read' : 'mail'} className="size-6 text-primary-600" />
			</div>

			<div className="flex flex-col gap-1 pt-4 pb-3 px-6">
				<div className="font-display font-bold text-primary-600 text-title-lg">{title}</div>
				<p className="font-body text-body-md text-neutral-600 line-clamp-4">{description}</p>
			</div>

			<div className="flex flex-col items-start pt-3 pb-6 px-6">
				<SubscribeButton
					status={state}
					label="Assinar"
					type="outlined"
					size="medium"
					onSubscribe={onSubscribe}
				/>
			</div>
		</div>
	)
}
