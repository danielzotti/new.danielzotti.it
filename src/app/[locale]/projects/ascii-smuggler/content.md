### What is ASCII Smuggling?

ASCII Smuggling is a technique that hides text within Unicode characters that do not render visually in standard fonts. Specifically, it uses characters from the **Unicode Tags Block (U+E0000–U+E007F)**, which map 1:1 to the standard ASCII character set.

### Why is it a security issue?

- **Indirect Prompt Injection:** An attacker can embed hidden instructions on a webpage or within a document. When a Large Language Model (LLM) parses the page, the model's tokenizer decodes these characters and processes the hidden instructions, while a human reading the same page sees only the benign text.
- **Data Exfiltration:** Sensitive information could be encoded as invisible characters and smuggled out of a secure environment past data loss prevention (DLP) systems.

### How to defend against it?

Sanitize all inputs processed by LLMs or rendering engines. Ensure that characters within the Unicode Tags block (U+E0000 to U+E007F) are stripped out or neutralized before processing.
