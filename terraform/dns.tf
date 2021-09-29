resource "cloudflare_zone" "lesempolem_cz" {
  zone = "lesempolem.cz"
}

resource "cloudflare_record" "cname_lesempolem_cz" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "lesempolem.cz"
  type    = "CNAME"
  value = "lesempolem.pages.dev"
  proxied = true
}

resource "cloudflare_record" "cname_www_lesempolem_cz" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "www"
  type    = "CNAME"
  value = "lesempolem.pages.dev"
  proxied = true
}

resource "cloudflare_record" "mx_1" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "lesempolem.cz"
  type    = "MX"
  value = "d38c0c2a35c0e449.mx2.emailprofi.seznam.cz"
  priority = 10
  proxied = false
}

resource "cloudflare_record" "mx_2" {
  zone_id = cloudflare_zone.lesempolem_cz.id
  name    = "lesempolem.cz"
  type    = "MX"
  value = "d38c0c2a35c0e449.mx1.emailprofi.seznam.cz"
  priority = 20
  proxied = false
}
