import { twMerge } from '~/lib/tw-merge'
import { Button } from '~/components/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/card'
import { Icon } from '~/components/icon'
import { Spinner } from '~/components/spinner'
import type { INewsletterCardProps } from './types'

/**
 * Componente: Newsletter Card
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8060-4432
 * Variantes: idle | pending | subscribed | error
 * Estrutura shadcn Card (CardHeader/CardContent/CardFooter) — mesmo componente já usado no
 * projeto, com paddings próprios pra bater com o Figma. Divergência deliberada do Figma:
 * lá o card tem altura fixa (284px) com o rodapé colado na base (flex-1 + justify-end);
 * aqui o rodapé segue o fluxo normal, direto após a descrição (truncada em 4 linhas) — com
 * altura fixa, descrições mais curtas que o placeholder do Figma abriam um vão grande entre
 * texto e botão, já que o rodapé sempre empurrava para a base do card.
 * "error" não existe no componente Figma (só Unsubscribed/Subscribing/Subscribed) — extensão
 * dev-side: mesmo botão outlined do estado idle, com mensagem inline em --color-danger-600.
 * "subscribed" é terminal — o componente não expõe caminho de volta a idle nem controle de
 * cancelamento.
 * Tokens: --color-primary-600, --color-neutral-100, --color-neutral-600, --color-secondary-50,
 *         --color-secondary-950, --color-danger-600, --text-title-lg, --text-body-md, --text-body-lg
 */
export function NewsletterCard({ id, title, description, state = 'idle', onSubscribe, className }: INewsletterCardProps) {
	const isSubscribed = state === 'subscribed'

	return (
		<Card id={id} className={twMerge('w-full gap-0 py-0 shadow-none', className)}>
			<CardHeader className="gap-0 pt-6 px-6">
				<Icon name={isSubscribed ? 'mark-email-read' : 'mail'} className="size-6 text-primary-600" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1 pt-4 pb-3 px-6">
				<CardTitle className="text-title-lg">{title}</CardTitle>
				<CardDescription className="line-clamp-4">{description}</CardDescription>
			</CardContent>

			<CardFooter className="flex-col items-start pt-3 pb-6 px-6">
				{state === 'idle' ? <Button type="outlined" size="medium" label="Assinar" onClick={onSubscribe} /> : null}

				{state === 'pending' ? (
					<span className="inline-flex items-center gap-2 h-10 pl-4 pr-5 rounded-full border-[1.5px] border-primary-600 text-primary-600 font-body font-bold text-body-lg cursor-default">
						<Spinner className="size-4" />
						Assinando...
					</span>
				) : null}

				{isSubscribed ? (
					<span
						role="status"
						className="inline-flex items-center gap-2 h-10 pl-4 pr-5 rounded-full bg-secondary-50 text-secondary-950 font-body font-bold text-body-lg"
					>
						<Icon name="check" className="size-6" />
						Assinado
					</span>
				) : null}

				{state === 'error' ? (
					<div className="flex flex-col items-start gap-2 w-full">
						<Button type="outlined" size="medium" label="Tentar novamente" onClick={onSubscribe} />
						<p className="font-body text-body-sm text-danger-600">
							Não foi possível confirmar a assinatura. Tente novamente.
						</p>
					</div>
				) : null}
			</CardFooter>
		</Card>
	)
}
