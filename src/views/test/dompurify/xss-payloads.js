export const xss_payloads = {
  1: "<script>alert('XSS')</script>",
  2: `<img src="x" onerror="alert('XSS')">`,
  3: `javascript:alert('XSS')`,
  4: `<svg/onload=alert('XSS')>`
};
