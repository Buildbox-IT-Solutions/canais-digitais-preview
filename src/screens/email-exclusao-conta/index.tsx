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
 * E-mail transacional: Confirmação de exclusão de conta (prazo de 14 dias p/ cancelar).
 * Referência: docs/legacy-reference/emails/email-exclusao-conta.html
 * Genericizado (sem "todos os portais Informa").
 */
export default function EmailExclusaoContaScreen() {
	const link = 'https://foodconnection.com.br/cancelar-exclusao?token=[TOKEN]'
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Recebemos sua solicitação</EmailH1>
				<EmailP>
					Olá, [NOME]. Confirmamos o pedido de exclusão da sua conta em{' '}
					<EmailStrong>[DATA_SOLICITACAO]</EmailStrong>.
				</EmailP>
				<EmailP>
					Esta ação encerrará seu acesso à Food Connection. Sua conta será{' '}
					<EmailStrong>permanentemente removida em 14 dias</EmailStrong> — até lá, você pode cancelar
					a exclusão se mudar de ideia.
				</EmailP>
				<EmailPMuted>
					Uma pequena parte dos seus dados (como registros de acesso e download) pode ser mantida
					por tempo limitado apenas para cumprir obrigações legais, e não será usada para novas
					comunicações. Depois desse prazo, também é eliminada.
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
							fontFamily: "'Open Sans', Arial, sans-serif",
							fontWeight: 700,
							fontSize: 15,
							color: '#283857',
						}}
					>
						O que será excluído:
					</p>
					<ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#5A6E8F' }}>
						<li>Dados de perfil (nome, foto, telefone, endereço)</li>
						<li>Preferências e inscrições de newsletter</li>
					</ul>
				</div>
			</div>

			<EmailButton href={link} label="Cancelar exclusão" />
			<EmailFallback href={link} />
			<EmailDivider />
			<EmailNote>
				<EmailStrong>Não reconhece esta solicitação?</EmailStrong> Isso pode significar que outra
				pessoa tem acesso à sua conta. Clique em "Cancelar exclusão" acima — além de manter sua conta
				ativa, você poderá trocar a senha e proteger seu acesso na mesma página.
			</EmailNote>
		</EmailShell>
	)
}
