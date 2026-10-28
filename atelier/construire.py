"""Construit l'atelier : une page plein écran par pièce, et la page de jugement (index.html) qui les liste.

Chaque pièce = pieces/<nom>.js ; le cadre = cadre.html ; les outils communs = bibliotheque/commun.js.
Sortie : <nom>.html et index.html, à côté de ce script. Python 3 seul, aucune dépendance.
Usage : python3 construire.py   (sort 0 si tout est construit, 1 sinon)
"""
import glob, html, json, os, re, sys

ICI = os.path.dirname(os.path.abspath(__file__))
lire = lambda p: open(p, encoding="utf8").read()
COMMUN = lire(os.path.join(ICI, "bibliotheque", "commun.js"))
CADRE = lire(os.path.join(ICI, "cadre.html"))
TOUR = "Tour 4 · 27 octobre"
PREFIXE = "t4-"
PRETES = {"t4-15-pierre", "t4-16-rosace", "t4-17-estampe", "t4-18-rouleau", "t4-20-mappemonde"}   # les pièces vérifiées ; les autres du tour arrivent ensuite   # la page de jugement montre les pièces du tour en cours ; toutes restent construites

fautes, liste = [], []
for chemin in sorted(glob.glob(os.path.join(ICI, "pieces", "*.js"))):
    nom = os.path.splitext(os.path.basename(chemin))[0]
    src = lire(chemin)
    if "window.ETUDE" not in src:
        fautes.append(f"{nom} : window.ETUDE manque"); continue
    m = re.search(r":\s*([A-ZÀ-Ý][A-ZÀ-Ý' \-]+?)\s*(\(|=)", src.splitlines()[0])
    titre = m.group(1).strip() if m else nom
    m = re.search(r"/\*(.*?)\*/", src[src.find("\n"):], re.S)
    resume = " ".join(m.group(1).split()) if m else ""
    loi = re.search(r"La loi\s*:\s*(.*?)(?:\.\s|$)", resume)
    page = CADRE.replace("/*__TITRE__*/", titre.title()).replace("/*__COMMUN__*/", COMMUN).replace("/*__ETUDE__*/", src)
    open(os.path.join(ICI, nom + ".html"), "w", encoding="utf8").write(page)
    liste.append({"id": nom, "titre": titre, "resume": resume[:380] + ("…" if len(resume) > 380 else ""), "loi": loi.group(1) if loi else ""})

if fautes:   # une pièce en chantier n'empêche pas les autres de se construire
    print("PIÈCES IGNORÉES :\n- " + "\n- ".join(fautes))

du_tour = [p for p in liste if p["id"].startswith(PREFIXE) and (not PRETES or p["id"] in PRETES)] or liste
cartes = "\n".join(f'''<article class="carte" data-id="{p["id"]}">
  <div class="tete"><span class="num">{i+1:02d}</span><h2>{html.escape(p["titre"])}</h2></div>
  <p class="resume">{html.escape(p["resume"])}</p>
  <a class="ouvrir" href="{p["id"]}.html">Ouvrir la pièce</a>
  <label class="lbl" for="m-{p["id"]}">Tes mots</label>
  <textarea id="m-{p["id"]}" placeholder="Ce que tu ressens, ce qui marche, ce qui ne marche pas. Tes mots exacts."></textarea>
  <div class="note" role="group" aria-label="Note de 1 à 5">{"".join(f'<button type="button" data-n="{n}">{n}</button>' for n in range(1, 6))}</div>
</article>''' for i, p in enumerate(du_tour))

index = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>L'atelier du Pointage</title>
<style>
:root{{--bg:#0F1014;--carte:#17181D;--trait:#26272E;--trait2:#34353D;--encre:#F2F0EA;--gris:#A3A1A8;--pale:#77757D}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--encre);font:15px/1.55 -apple-system,'Inter Tight',system-ui,sans-serif}}
main{{max-width:760px;margin:0 auto;padding:28px 16px 80px}}
.sur{{font:500 12px ui-monospace,Consolas,monospace;letter-spacing:.14em;color:var(--pale);text-transform:uppercase}}
h1{{font:500 34px/1.1 Georgia,serif;margin:8px 0 10px;letter-spacing:-.01em}}
.intro{{color:var(--gris);margin:0 0 8px}}
.carte{{background:var(--carte);border:1px solid var(--trait);border-radius:20px;padding:18px;margin:16px 0}}
.tete{{display:flex;align-items:baseline;gap:12px}}
.num{{font:500 12px ui-monospace,monospace;color:var(--pale)}}
h2{{font:500 22px/1.2 Georgia,serif;margin:0;letter-spacing:.02em}}
.resume{{color:var(--gris);font-size:13.5px;margin:8px 0 14px}}
.ouvrir{{display:block;text-align:center;padding:13px;border:1px solid var(--encre);color:var(--encre);text-decoration:none;font:500 14px Georgia,serif;letter-spacing:.14em;text-transform:uppercase}}
.ouvrir:active{{background:rgba(242,240,234,.12)}}
.lbl{{display:block;margin:16px 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gris)}}
textarea{{width:100%;min-height:84px;background:var(--bg);border:1px solid var(--trait2);border-radius:12px;color:var(--encre);padding:12px;font:16px/1.5 Georgia,serif;resize:vertical}}
textarea:focus{{outline:none;border-color:var(--encre)}}
.note{{display:flex;gap:8px;margin-top:10px}}
.note button{{flex:1;height:44px;border-radius:12px;border:1px solid var(--trait2);background:none;color:var(--gris);font:600 15px system-ui,sans-serif;cursor:pointer}}
.note button.on{{background:var(--encre);color:var(--bg);border-color:var(--encre)}}
.envoyer{{position:sticky;bottom:12px;margin-top:20px;background:var(--bg);padding-top:8px}}
.envoyer button{{width:100%;height:52px;border:none;border-radius:14px;background:var(--encre);color:var(--bg);font:600 15px system-ui,sans-serif;cursor:pointer}}
.envoyer small{{display:block;text-align:center;color:var(--pale);margin-top:8px;font-size:12px}}
</style></head><body><main>
<div class="sur">L'atelier du Pointage · {TOUR}</div>
<h1>Ta journée, tour 4</h1>
<p class="intro">Tes mots du tour 3 ont décidé de celui-ci : « sois ambitieux » pour les seuils, « Merci ! » après l'explosion, plus de lignes bizarres au centre.
Cinq pièces sont là, dont la Mappemonde, neuve ; le Codex arrive sur cette même page. Le bouton en bas fait la priorité suivante ; au cinquième geste, la journée est bouclée.</p>
<p class="intro">Le menu-rouleau, lui, est déjà dans ton app : dans Maintenant et dans Domaines.</p>
<p class="intro">Puis écris ce que tu ressens, avec tes mots, et donne une note. C'est toi qui juges : tes mots décident du tour suivant.</p>
{cartes}
<div class="envoyer"><button type="button" id="copier">Copier mes verdicts</button><small>puis colle-les dans la conversation avec Claude</small></div>
</main>
<script>
const PIECES = {json.dumps([{"id": p["id"], "titre": p["titre"]} for p in du_tour], ensure_ascii=False)};
const CLE = "atelier_tour4";
let V = {{}}; try {{ V = JSON.parse(localStorage.getItem(CLE) || "{{}}") || {{}}; }} catch (e) {{}}
const garder = () => {{ try {{ localStorage.setItem(CLE, JSON.stringify(V)); }} catch (e) {{}} }};
document.querySelectorAll(".carte").forEach(c => {{
  const id = c.dataset.id, ta = c.querySelector("textarea"), v = V[id] = V[id] || {{}};
  ta.value = v.mots || "";
  ta.addEventListener("input", () => {{ v.mots = ta.value; garder(); }});
  const B = c.querySelectorAll(".note button");
  const peindre = () => B.forEach(b => b.classList.toggle("on", +b.dataset.n === v.note));
  B.forEach(b => b.addEventListener("click", () => {{ v.note = v.note === +b.dataset.n ? 0 : +b.dataset.n; peindre(); garder(); }}));
  peindre();
}});
document.getElementById("copier").addEventListener("click", () => {{
  const txt = "Verdicts · {TOUR}\\n\\n" + PIECES.map((p, i) => {{ const v = V[p.id] || {{}};
    return (i + 1) + ". " + p.titre + " · " + (v.note ? v.note + "/5" : "pas noté") + "\\n" + ((v.mots || "").trim() || "(pas de mots)"); }}).join("\\n\\n");
  const ok = () => {{ const b = document.getElementById("copier"); b.textContent = "Copié ✓"; setTimeout(() => b.textContent = "Copier mes verdicts", 1800); }};
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok).catch(() => prompt("Copie ce texte :", txt));
  else prompt("Copie ce texte :", txt);
}});
</script></body></html>"""
open(os.path.join(ICI, "index.html"), "w", encoding="utf8").write(index)
print(len(liste), "pièces construites dans", ICI)
