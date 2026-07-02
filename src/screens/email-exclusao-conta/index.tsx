import {
	EmailShell,
	EmailBody,
	EmailH1,
	EmailP,
	EmailPMuted,
	EmailStrong,
	EmailButton,
	EmailFallback,
	EmailDivider,
	EmailNote,
} from '../_emails/shell'

/**
 * E-mail transacional: Confirmação de exclusão de conta (prazo de 30 dias p/ cancelar).
 * Referência: docs/legacy-reference/emails/email-exclusao-conta.html
 * SEM link de descadastrar no footer (contexto legal/transacional). Genericizado (sem "todos
 * os portais Informa").
 */
export default function EmailExclusaoContaScreen() {
	const link = 'https://foodconnection.com.br/cancelar-exclusao?token=[TOKEN]'
	return (
		<EmailShell showUnsubscribe={false}>
			<EmailBody>
				<EmailH1>Recebemos sua solicitação</EmailH1>
				<EmailP>
					Olá, [NOME]. Confirmamos o pedido de exclusão da sua conta em{' '}
					<EmailStrong>[DATA_SOLICITACAO]</EmailStrong>.
				</EmailP>
				<EmailP>
					Esta ação encerrará seu acesso à Food Connection. Sua conta será{' '}
					<EmailStrong>permanentemente removida em 30 dias</EmailStrong> — até lá, você pode cancelar
					a exclusão se mudar de ideia.
				</EmailP>
				<EmailPMuted>
					Seu histórico de downloads será mantido pelo prazo mínimo exigido por lei e não será
					utilizado para novas comunicações.
				</EmailPMuted>
			</EmailBody>

			<div style={{ padding: '8px 32px 16px 32px' }}>
				<div
					style={{
						background: '#FEF3C7',
						borderLeft: '4px solid #F59E0B',
						padding: '16px 20px',
						borderRadius: 4,
					}}
				>
					<p
						style={{
							margin: '0 0 8px 0',
							fontFamily: 'Georgia, serif',
							fontWeight: 700,
							fontSize: 15,
							color: '#283857',
						}}
					>
						O que será excluído:
					</p>
					<ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#5A6E8F' }}>
						<li>Dados de perfil (nome, foto, telefone, endereço)</li>
						<li>Histórico de downloads e acessos</li>
						<li>Preferências e inscrições de newsletter</li>
					</ul>
				</div>
			</div>

			<EmailButton href={link} label="Cancelar exclusão" />
			<EmailFallback href={link} />
			<EmailDivider />
			<EmailNote>
				Se não reconhece esta solicitação, entre em contato imediatamente pelo suporte — podemos
				estornar o pedido e investigar o acesso.
			</EmailNote>
		</EmailShell>
	)
}
