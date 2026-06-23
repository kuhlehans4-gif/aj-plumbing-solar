# A&J Plumbing & Solar Website

Modern static website with a Vercel contact API for A&J Plumbing & Solar in Kroonstad, South Africa.

## Local Check

```powershell
npm run check
npm start
```

Open `http://localhost:4173`.

## Contact Form

The contact form posts directly from the browser to [FormSubmit](https://formsubmit.co)
(no account or API key required). The destination email is injected into the built HTML
at deploy time from the `CONTACT_FORM_TO_EMAIL` environment variable, so the address is
never committed to the repo.

Required Vercel environment variable:

```text
CONTACT_FORM_TO_EMAIL=info@ajplumbing.co.za
```

On the first submission, FormSubmit emails an activation link to that address. Click it
once and all future submissions are delivered. To change the recipient, update the env
var in Vercel and redeploy.

## Deployment

Deploy to Vercel after setting the environment variable above.
