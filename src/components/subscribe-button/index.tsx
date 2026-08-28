/**
 * Componente: Subscribe Button
 * Sem node Figma próprio — peça de sistema, composta sobre o Button [1.1]
 * (3185:47973). Registrar no Figma é pendência: ver ds/achados.md.
 *
 * O botão de uma ação com DESFECHO PERSISTENTE: a pessoa aperta uma vez e o sistema
 * passa a lembrar. Referência de comportamento é o botão de inscrição do YouTube. O
 * componente é nomeado pelo que faz, não pelo conteúdo que serve — por isso `label` é
 * livre ("Assine agora", "Inscrever-se", "Seguir") e nada aqui menciona newsletter.
 *
 * Estende o eixo `type` do Button (filled | outlined | ghost) com o eixo `status`
 * (idle | pending | subscribed). O tipo é PRESERVADO em todos os status: um botão
 * outlined que carrega continua outlined. Isso diverge do `Loading Button [1.0]` do
 * Figma, que só existia em Filled porque era um componente separado, trocado no lugar
 * do original — aqui não há troca de elemento em `idle → pending`, e continuidade de
 * identidade vale mais que contraste (ver o cabeçalho de components/button).
 *
 * `subscribed` NÃO é clicável (decisão de produto de 28/08/2026: a assinatura é
 * terminal, sem cancelamento nesta superfície). Por isso ele não renderiza um
 * `<button>` desabilitado — que anunciaria uma ação inexistente para o leitor de tela
 * e ficaria com a cor de disabled, sinal de "indisponível agora", quando o certo é
 * "concluído". Renderiza um `role="status"`, com as MEDIDAS do botão que substitui
 * (importadas do Button), para o layout não pular no momento em que assina.
 *
 * Falha não é status daqui: quem chama devolve para `idle` e avisa por toast com ação
 * "Repetir" — mesmo padrão do toggle de favoritos.
 *
 * Tokens: --color-secondary-50, --color-secondary-950 (selo) + os do Button.
 */
import {
	BUTTON_LEADING_ICON_PADDING,
	BUTTON_SIZE_CLASSES,
	Button,
	buttonIconSize,
} from '~/components/button'
import { Icon } from '~/components/icon'
import { twMerge } from '~/lib/tw-merge'
import type { ISubscribeButtonProps } from './types'

export function SubscribeButton({
	status = 'idle',
	label,
	pendingLabel = 'Assinando...',
	subscribedLabel = 'Assinado',
	type = 'filled',
	tone = 'default',
	size = 'medium',
	href,
	onSubscribe,
	className,
}: ISubscribeButtonProps) {
	if (status === 'subscribed') {
		return (
			<span
				role="status"
				className={twMerge(
					'inline-flex items-center justify-center rounded-full bg-secondary-50 text-secondary-950 font-body font-bold',
					BUTTON_SIZE_CLASSES[size],
					BUTTON_LEADING_ICON_PADDING[size],
					className,
				)}
			>
				<Icon name="check" className={buttonIconSize(size)} />
				{subscribedLabel}
			</span>
		)
	}

	const pending = status === 'pending'

	return (
		<Button
			label={pending ? pendingLabel : label}
			href={href}
			type={type}
			tone={tone}
			size={size}
			loading={pending}
			onClick={onSubscribe}
			className={className}
		/>
	)
}
