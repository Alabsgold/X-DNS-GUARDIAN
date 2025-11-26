import dns.resolver
import whois
import socket
import ssl
from datetime import datetime
from classifier import classify_domain

async def scan_domain_service(domain: str):
    scan_data = {
        "domain": domain,
        "scan_time": datetime.utcnow().isoformat(),
        "dns_records": {},
        "whois_data": {},
        "ssl_info": {},
        "safety_profile": {}
    }

    # 1. DNS Records
    try:
        resolver = dns.resolver.Resolver()
        # A Records
        try:
            a_records = resolver.resolve(domain, 'A')
            scan_data["dns_records"]["A"] = [r.to_text() for r in a_records]
            scan_data["dns_records"]["ttl"] = a_records.rrset.ttl
        except Exception:
            scan_data["dns_records"]["A"] = []
            scan_data["dns_records"]["ttl"] = 0

        # MX Records
        try:
            mx_records = resolver.resolve(domain, 'MX')
            scan_data["dns_records"]["MX"] = [r.to_text() for r in mx_records]
        except Exception:
            scan_data["dns_records"]["MX"] = []

        # NS Records
        try:
            ns_records = resolver.resolve(domain, 'NS')
            scan_data["dns_records"]["NS"] = [r.to_text() for r in ns_records]
        except Exception:
            scan_data["dns_records"]["NS"] = []

    except Exception as e:
        print(f"DNS Error: {e}")

    # 2. WHOIS/RDAP
    try:
        w = whois.whois(domain)
        scan_data["whois_data"] = {
            "registrar": w.registrar,
            "creation_date": str(w.creation_date),
            "expiration_date": str(w.expiration_date),
            "emails": w.emails
        }
    except Exception as e:
        print(f"WHOIS Error: {e}")
        scan_data["whois_data"] = {"error": str(e)}

    # 3. SSL Check (Basic)
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=3) as sock:
            with ctx.wrap_socket(sock, server_hostname=domain) as ssock:
                cert = ssock.getpeercert()
                scan_data["ssl_info"] = {"valid": True, "issuer": str(cert.get('issuer'))}
    except Exception:
        scan_data["ssl_info"] = {"valid": False}

    # 4. Classification
    scan_data["safety_profile"] = classify_domain(scan_data)

    return scan_data
