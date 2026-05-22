# A&J Plumbing & Solar Website

Modern static website with a Vercel contact API for A&J Plumbing & Solar in Kroonstad, South Africa.

## Local Check

```powershell
npm run check
npm start
```

Open `http://localhost:4173`.

## Contact Form

The form posts to `/api/contact`, which forwards validated submissions to Web3Forms.

Required Vercel environment variables:

```text
WEB3FORMS_ACCESS_KEY=
CONTACT_FORM_TO_EMAIL=info@ajplumbing.co.za
```

The Web3Forms access key must be created with `info@ajplumbing.co.za` as the destination email.

## Deployment

Deploy to Vercel after setting the environment variables above.
