resource "cloudflare_zone" "lesempolem_cz" {
  zone       = "lesempolem.cz"
  account_id = var.CLOUDFLARE_ACCOUNT_ID
}

resource "cloudflare_zone_dnssec" "lesempolem_cz" {
  zone_id = cloudflare_zone.lesempolem_cz.id
}

resource "cloudflare_record" "cname_lesempolem_cz" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "lesempolem.cz"
  type    = "CNAME"
  value   = "lesempolem.pages.dev"
  proxied = true
}

resource "cloudflare_record" "cname_www_lesempolem_cz" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "www"
  type    = "CNAME"
  value   = "lesempolem.pages.dev"
  proxied = true
}

resource "cloudflare_record" "mx_1" {
  zone_id  = cloudflare_zone.lesempolem_cz.id
  name     = "lesempolem.cz"
  type     = "MX"
  value    = "d38c0c2a35c0e449.mx2.emailprofi.seznam.cz"
  priority = 10
  proxied  = false
}

resource "cloudflare_record" "mx_2" {
  zone_id  = cloudflare_zone.lesempolem_cz.id
  name     = "lesempolem.cz"
  type     = "MX"
  value    = "d38c0c2a35c0e449.mx1.emailprofi.seznam.cz"
  priority = 20
  proxied  = false
}

resource "cloudflare_record" "google_verification" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "lesempolem.cz"
  type    = "TXT"
  value   = "google-site-verification=ZI4A65BCTQPahqvG4tUljiJEgagRmdjnQ_6mfxGvbN8"
}

resource "cloudflare_record" "spf" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "lesempolem.cz"
  type    = "TXT"
  value   = "v=spf1 include:spf.seznam.cz ~all"
}

resource "cloudflare_record" "dkim_sig" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "szn20221014._domainkey.lesempolem.cz."
  type    = "CNAME"
  value   = "szn20221014._domainkey.seznam.cz."
}

resource "cloudflare_record" "dkim_szn1" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "szn1._domainkey.lesempolem.cz."
  type    = "CNAME"
  value   = "szn1._domainkey.seznam.cz."
}

resource "cloudflare_record" "dkim_szn2" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "szn2._domainkey.lesempolem.cz."
  type    = "CNAME"
  value   = "szn2._domainkey.seznam.cz."
}

resource "cloudflare_record" "dkim_szn3" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "szn3._domainkey.lesempolem.cz."
  type    = "CNAME"
  value   = "szn3._domainkey.seznam.cz."
}

resource "cloudflare_record" "dmarc" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "_dmarc"
  type    = "TXT"
  value   = "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s"
}
