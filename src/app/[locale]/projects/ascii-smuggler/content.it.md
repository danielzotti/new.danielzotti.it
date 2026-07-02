### Cos'è l'ASCII Smuggling?

L'ASCII Smuggling è una tecnica che nasconde testo in caratteri Unicode non visibili nei font standard, in particolare nel **blocco Unicode Tags (U+E0000–U+E007F)**, mappato 1:1 con l'ASCII.

### Perché è un problema di sicurezza?

- **Prompt injection indiretta:** un attaccante può inserire istruzioni nascoste in una pagina o documento. Un LLM le interpreta, mentre un utente umano vede solo testo innocuo.
- **Esfiltrazione dati:** informazioni sensibili possono essere codificate in caratteri invisibili e superare i controlli DLP.

### Come difendersi?

Sanitizza tutti gli input processati da LLM o renderer. Rimuovi o neutralizza i caratteri nel range Unicode Tags (U+E0000–U+E007F) prima dell'elaborazione.
