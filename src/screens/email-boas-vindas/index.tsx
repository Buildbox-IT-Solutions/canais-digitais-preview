import { EmailShell, EmailBody, EmailH1, EmailP, EmailButton, EmailFallback } from '../_emails/shell'

/**
 * E-mail transacional: Boas-vindas (pós-confirmação, conta ativada).
 * Referência: docs/legacy-reference/emails/email-boasvindas.html
 * Genericizado: sem a seção "todos os portais Informa" (conta global fora de escopo).
 */
export default function EmailBoasVindasScreen() {
	const link = 'https://foodconnection.com.br/minha-conta'
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Boas-vindas à Food Connection, [NOME]!</EmailH1>
				<EmailP>
					Sua conta está ativa. A partir de agora, você baixa materiais com um clique — sem preencher
					formulário toda vez.
				</EmailP>
				<EmailP>
					O próximo passo (opcional) é completar seu perfil para começar a receber recomendações
					personalizadas do seu setor.
				</EmailP>
			</EmailBody>
			<EmailButton href={link} label="Completar meu perfil" />
			<EmailFallback href={link} />
		</EmailShell>
	)
}
