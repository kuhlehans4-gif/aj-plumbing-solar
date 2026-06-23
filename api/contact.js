const MAX_BODY_SIZE = 1000000;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function parseBody(req, rawBody) {
  const contentType = req.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody || "{}");
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  return JSON.parse(rawBody || "{}");
}

function clean(value) {
  return String(value || "").trim();
}

function validate(data) {
  const errors = [];
  const name = clean(data.name);
  const email = clean(data.email);
  const phone = clean(data.phone);
  const service = clean(data.service);
  const message = clean(data.message);

  if (!name) errors.push({ field: "name", message: "Please enter your name." });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }
  if (!phone) errors.push({ field: "phone", message: "Please enter your phone number." });
  if (!service) errors.push({ field: "service", message: "Please choose the service you need help with." });
  if (!message || message.length < 10) {
    errors.push({ field: "message", message: "Please add a short message." });
  }

  return errors;
}

function buildFormSubmitPayload(data) {
  const service = clean(data.service) || "General enquiry";
  const company = clean(data.company) || "Not provided";
  const email = clean(data.email);

  return {
    _subject: `New website enquiry - ${service}`,
    _template: "table",
    _captcha: "false",
    name: clean(data.name),
    phone: clean(data.phone),
    email: email || "not provided",
    service,
    company,
    message: clean(data.message)
  };
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, {
      ok: false,
      errors: [{ type: "MethodNotAllowed", message: "Use POST for contact submissions.", details: {} }]
    });
  }

  const toEmail = process.env.CONTACT_FORM_TO_EMAIL;
  if (!toEmail) {
    return sendJson(res, 503, {
      ok: false,
      errors: [
        {
          type: "ConfigurationError",
          message: "The contact form is not configured yet. Please call or email A&J Plumbing & Solar directly.",
          details: { missing: "CONTACT_FORM_TO_EMAIL" }
        }
      ]
    });
  }

  try {
    const rawBody = await readBody(req);
    const data = parseBody(req, rawBody);

    if (clean(data.botcheck)) {
      return sendJson(res, 200, { ok: true, data: { skipped: true }, errors: [] });
    }

    const validationErrors = validate(data);
    if (validationErrors.length > 0) {
      return sendJson(res, 400, {
        ok: false,
        errors: validationErrors.map((error) => ({
          type: "ValidationError",
          message: error.message,
          details: { field: error.field }
        }))
      });
    }

    const payload = buildFormSubmitPayload(data);
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success !== "true") {
      return sendJson(res, 502, {
        ok: false,
        errors: [
          {
            type: "DeliveryError",
            message: "The message could not be sent. Please call or email A&J Plumbing & Solar directly.",
            details: { providerStatus: response.status }
          }
        ]
      });
    }

    return sendJson(res, 200, {
      ok: true,
      data: { delivered: true },
      errors: []
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      errors: [
        {
          type: "ContactFormError",
          message: "The message could not be processed. Please call or email A&J Plumbing & Solar directly.",
          details: { reason: error.message }
        }
      ]
    });
  }
};
