# EmailJS — demo requests

The `/contact` page's "Or share your details" form emails demo requests to us via
[EmailJS](https://www.emailjs.com) (no backend yet). Here's how to wire it up.
The Cal.com "Get in touch" booking popup on the same page works independently of
EmailJS.

## 1. Create the service & template

1. Sign in to EmailJS → **Email Services** → add the inbox you want demo
   requests delivered to. Note the **Service ID**.
2. **Email Templates** → create a new template whose body renders the variables
   below (switch the editor to its HTML/code view if you want to style it).
3. In the template settings set:
   - **To Email:** the address that should receive demo requests (e.g. your inbox)
   - **From Name:** `efficura demo requests`
   - **Reply To:** `{{from_email}}` — so you can reply straight to the requester
   - **Subject:** `New demo request from {{from_name}}`
4. Note the **Template ID**.
5. **Account → General** → copy your **Public Key**.

The template uses five variables, which the form sends on submit:

| Variable         | Value                                    |
| ---------------- | ---------------------------------------- |
| `{{from_name}}`  | The requester's full name                |
| `{{from_email}}` | The requester's work email               |
| `{{company}}`    | Their company                            |
| `{{source}}`     | How they heard about us (optional)       |
| `{{message}}`    | Their description / what they want to see |

## 2. Set the env vars

Put your three IDs in `.env.local` (already gitignored):

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

These are `NEXT_PUBLIC_` because EmailJS runs in the browser — they're safe to
expose. Restart `next dev` after changing them (they're inlined at build time).

For production, set the same three variables in your host's environment
(e.g. Vercel project settings).
