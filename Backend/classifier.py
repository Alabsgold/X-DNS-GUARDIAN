def classify_domain(scan_data):
    score = 100
    threats = []
    status = "Safe"

    domain = scan_data.get("domain", "").lower()
    dns_records = scan_data.get("dns_records", {})
    whois_data = scan_data.get("whois_data", {})
    ssl_info = scan_data.get("ssl_info", {})

    # Rule 1: Phishing Keywords
    phishing_keywords = ['login', 'bank', 'verify', 'secure', 'account', 'update']
    if any(keyword in domain for keyword in phishing_keywords):
        score -= 40
        threats.append("Potential Phishing Keyword")

    # Rule 2: SSL
    if not ssl_info.get("valid"):
        score -= 30
        threats.append("No Valid SSL")

    # Rule 3: Short TTL (often used in fast flux)
    ttl = dns_records.get("ttl", 0)
    if ttl > 0 and ttl < 300:
        score -= 10
        threats.append("Short TTL (Suspicious)")

    # Rule 4: Registrar check (Generic/Missing)
    registrar = str(whois_data.get("registrar", "")).lower()
    if not registrar or "null" in registrar:
        score -= 10
        threats.append("Hidden/Unknown Registrar")

    # Determine Status
    if score < 50:
        status = "Dangerous"
    elif score < 80:
        status = "Suspicious"
    else:
        status = "Safe"

    return {
        "score": max(0, score),
        "status": status,
        "threats": threats
    }
