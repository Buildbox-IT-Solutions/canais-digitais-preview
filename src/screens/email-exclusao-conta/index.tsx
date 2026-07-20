import { EmailShell, EmailBody, EmailH1, EmailP, EmailPMuted, EmailStrong, EmailButton } from '../_emails/shell'

/**
 * E-mail transacional: Confirmação de exclusão de conta (exclusão direta e imediata, sem
 * janela de recuperação nem token de cancelamento).
 * Assunto: "Sua conta foi excluída"
 * Genericizado (sem "todos os portais Informa").
 */
export default function EmailExclusaoContaScreen() {
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Sua conta foi excluída</EmailH1>
				<EmailP>
					Olá, [NOME]. Confirmamos a exclusão da sua conta na Food Connection, solicitada em{' '}
					<EmailStrong>[DATA_SOLICITACAO]</EmailStrong>.
				</EmailP>
				<EmailP>
					Seus dados de perfil e preferências de newsletter foram removidos.
				</EmailP>
				<EmailPMuted>
					Uma pequena parte dos dados (como registros de acesso e download) pode ser mantida por
					tempo limitado apenas para cumprir obrigações legais, e não será usada para novas
					comunicações. Depois desse prazo, também é eliminada.
				</EmailPMuted>
			</EmailBody>

			<div style={{ padding: '8px 32px 24px 32px' }}>
				<div
					style={{
						background: '#F7F8FA',
						borderLeft: '4px solid #D6D8DD',
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
						O que foi excluído:
					</p>
					<ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#5A6E8F' }}>
						<li>Dados de perfil (nome, foto, telefone, endereço)</li>
						<li>Preferências e inscrições de newsletter</li>
					</ul>
				</div>
			</div>

			<EmailBody style={{ padding: '0 32px 8px 32px' }}>
				<EmailP>Sentiremos sua falta! Quando quiser, é só criar uma nova conta pra voltar a acessar a Food Connection.</EmailP>
			</EmailBody>

			<EmailButton href="https://foodconnection.com.br/cadastro" label="Criar nova conta" />
		</EmailShell>
	)
}
