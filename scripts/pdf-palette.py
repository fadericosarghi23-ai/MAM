# -*- coding: utf-8 -*-
"""
Genera il PDF di consegna del sito Geom. Brissoni Stefano: palette, errori corretti, miglioramenti,
stato deploy. Massimo quattro pagine A4, con le pastiglie di colore vere accanto ai token.

    py scripts/pdf-palette.py

Font: Georgia e Segoe UI di Windows, i più vicini a Newsreader e Inter del sito.
Logo: scripts/_logo-pdf.png (public/img/logo/logo-light.svg reso in PNG).
Scrive docs/palette-e-interventi.pdf e una copia sul Desktop (Brissoni-Report.pdf).
"""
import copy
import os
import shutil

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

FONTS = "C:/Windows/Fonts/"
pdfmetrics.registerFont(TTFont("Geo", FONTS + "georgia.ttf"))
pdfmetrics.registerFont(TTFont("GeoIt", FONTS + "georgiai.ttf"))
pdfmetrics.registerFont(TTFont("Seg", FONTS + "segoeui.ttf"))
pdfmetrics.registerFont(TTFont("SegB", FONTS + "segoeuib.ttf"))
pdfmetrics.registerFontFamily("Seg", normal="Seg", bold="SegB", italic="Seg", boldItalic="SegB")
pdfmetrics.registerFontFamily("Geo", normal="Geo", bold="Geo", italic="GeoIt", boldItalic="GeoIt")

# palette del sito (src/styles/global.css)
ACCENT = colors.HexColor("#202020")
INK = colors.HexColor("#2c2a2a")
TESTO = colors.HexColor("#202020")
GRIGIO = colors.HexColor("#5a5951")
BEIGE = colors.HexColor("#f1ebdd")
AVORIO = colors.HexColor("#f7f5ee")
LINEA = colors.HexColor("#e0deca")
ORO_TESTO = colors.HexColor("#7a6630")  # l'oro #cfbb8b su bianco fa 1.9:1: per i numeri del PDF una sua versione scura (5.6:1)

QUI = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(QUI)
LOGO = os.path.join(QUI, "_logo-pdf.png")
OUT = os.path.join(ROOT, "docs", "palette-e-interventi.pdf")
DESKTOP = os.path.join(os.path.dirname(os.path.dirname(ROOT)), "Brissoni-Report.pdf")
TOTALE = [0]

H1 = ParagraphStyle("H1", fontName="Geo", fontSize=24, leading=28, textColor=INK, spaceAfter=3)
SOT = ParagraphStyle("SOT", fontName="Seg", fontSize=9.2, leading=13.4, textColor=GRIGIO, spaceAfter=6)
H2 = ParagraphStyle("H2", fontName="Geo", fontSize=17, leading=21, textColor=INK, spaceBefore=8, spaceAfter=4,
                    keepWithNext=1)
P = ParagraphStyle("P", fontName="Seg", fontSize=8.9, leading=12.6, textColor=TESTO, spaceAfter=4)
PM = ParagraphStyle("PM", parent=P, textColor=GRIGIO, fontSize=8.6, leading=12.2)
CELL = ParagraphStyle("CELL", parent=P, fontSize=8.2, leading=11, spaceAfter=0)
CELLB = ParagraphStyle("CELLB", parent=CELL, fontName="SegB")
NUM = ParagraphStyle("NUM", parent=CELL, fontName="Geo", fontSize=12, leading=12, textColor=ORO_TESTO)


def cornice(c, doc):
    c.saveState()
    c.setFillColor(ACCENT)
    c.rect(0, A4[1] - 15 * mm, A4[0], 15 * mm, stroke=0, fill=1)
    c.drawImage(LOGO, 18 * mm, A4[1] - 11.4 * mm, width=36 * mm, height=36 * mm * 248 / 1200, mask="auto")
    c.setFont("Seg", 7.2)
    c.setFillColor(LINEA)
    c.drawRightString(A4[0] - 18 * mm, A4[1] - 9 * mm, "Palette, errori corretti e miglioramenti")
    c.setStrokeColor(LINEA)
    c.setLineWidth(0.5)
    c.line(18 * mm, 14 * mm, A4[0] - 18 * mm, 14 * mm)
    c.setFont("Seg", 7)
    c.setFillColor(GRIGIO)
    c.drawString(18 * mm, 10 * mm, "Sito nuovo Geom. Brissoni Stefano · github.com/fadericosarghi23-ai/brissoni- · dettagli in README.md")
    c.drawRightString(A4[0] - 18 * mm, 10 * mm,
                      "pagina %d di %d" % (doc.page, TOTALE[0]) if TOTALE[0] else "pagina %d" % doc.page)
    c.restoreState()


def tabella(dati, larghezze, extra=None):
    t = Table(dati, colWidths=larghezze, repeatRows=1, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 3.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2),
        ("LEFTPADDING", (0, 0), (-1, -1), 4.5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4.5),
        ("BACKGROUND", (0, 0), (-1, 0), BEIGE),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINEA),
    ] + (extra or [])))
    return t


def elenco(voci):
    righe = [[Paragraph("<b>#</b>", CELL), Paragraph("<b>che cosa · come è stato corretto</b>", CELL)]]
    for i, (tit, testo) in enumerate(voci, start=1):
        righe.append([Paragraph(str(i), NUM), Paragraph("<b>%s.</b> %s" % (tit, testo), CELL)])
    return tabella(righe, [9 * mm, 165 * mm])


story = []

# ================================================================= 1. palette
story.append(Paragraph("Palette, errori corretti e miglioramenti", H1))
story.append(Paragraph(
    "Sito nuovo del Geom. Brissoni Stefano, studio tecnico di progettazione a Scanzorosciate (BG), costruito "
    "sulla base del sito tìlde studio (struttura, design system e animazioni identici), svuotato e riempito "
    "con la mappa di riempimento e i contenuti del sito attuale su Wix. Quattro parti: da dove viene ogni "
    "colore, che cosa è stato sbagliato e corretto, che cosa fa meglio del sito attuale, e lo stato per il "
    "deploy su Netlify.", SOT))

story.append(Paragraph("1. La palette", H2))
story.append(Paragraph(
    "Tutti i colori stanno nel blocco <b>:root</b> di <b>src/styles/global.css</b>: cambiandoli lì cambia "
    "tutto il sito. Sono i colori del <b>tema del sito attuale</b> (Wix, variabili --color_N lette dal codice "
    "della pagina e verificate sugli elementi visibili): neutri caldi, antracite, avorio, beige e sabbia, "
    "più una riga oro presente nel tema. I contrasti sono calcolati con la formula WCAG.", P))

PALETTE = [
    ("--accent", "#202020", "Bottoni, sopratitoli, fascia contatti", "antracite di intestazione e fasce scure · 14.9:1 su avorio"),
    ("--accent-dark", "#41403a", "Hover dei bottoni", "grigio scuro del tema · testo bianco 10.4:1"),
    ("--ink", "#2c2a2a", "Titoli, footer, sezione scura, intro", "fascia scura dei servizi del sito"),
    ("--ink-2", "#41403a", "Superfici scure secondarie", "grigio scuro del tema"),
    ("--text", "#202020", "Testo corrente", "14.9:1 su avorio · 13.7:1 su beige"),
    ("--grey", "#5a5951", "Testo secondario, didascalie", "grigio caldo del tema · 6.5:1 su avorio, 5.9:1 su beige"),
    ("--sand", "#f1ebdd", "Sezioni chiare alternate", "beige del tema"),
    ("--grey-light", "#e0deca", "Fondo delle foto in caricamento", "sabbia del tema"),
    ("--accent-soft", "#e0deca", "Anello di focus nei campi", "sabbia del tema"),
    ("--accent-on-dark", "#cfbb8b", "Evidenza sui fondi scuri", "riga oro del tema · 7.6:1 su --ink, 8.6:1 su --accent"),
    ("--line", "#2020201a", "Righe divisorie", "antracite al 10%"),
    ("--white", "#f7f5ee", "Fondo pagina", "avorio, fondo del sito attuale"),
]
dati = [[Paragraph("<b>token</b>", CELL), "", Paragraph("<b>colore</b>", CELL),
         Paragraph("<b>ruolo</b>", CELL), Paragraph("<b>da dove viene · contrasto</b>", CELL)]]
stile = []
for i, (tok, hexv, ruolo, fonte) in enumerate(PALETTE, start=1):
    dati.append([Paragraph(tok, CELLB), "", Paragraph(hexv, CELL), Paragraph(ruolo, CELL), Paragraph(fonte, CELL)])
    sw = hexv[:7] if hexv != "#2020201a" else "#e9e7e0"
    stile += [("BACKGROUND", (1, i), (1, i), colors.HexColor(sw)), ("BOX", (1, i), (1, i), 0.4, LINEA)]
story.append(tabella(dati, [27 * mm, 10 * mm, 19 * mm, 50 * mm, 68 * mm], stile))
story.append(Spacer(1, 5))
story.append(Paragraph(
    "<b>Sull'oro.</b> Il sito attuale è tutto in neutri: l'oro sta nel suo tema ma sulle pagine quasi non "
    "compare. Qui sostituisce l'arancio della base e fa solo da evidenza sui fondi scuri (corsivo dell'hero, "
    "link del footer, linea dell'intro). Su fondo chiaro farebbe 1.9:1, non leggibile: non è mai usato lì. "
    "Per un sito ancora più sobrio basta mettere la sabbia #e0deca in --accent-on-dark.", PM))
story.append(Paragraph(
    "<b>Tipografia.</b> Resta quella della base: <b>Newsreader</b> per i titoli e <b>Inter</b> per il testo. "
    "<b>Logo.</b> Il cliente non ne ha uno: il sito attuale ha solo la scritta \"GEOMETRA LAUREATO BRISSONI "
    "STEFANO\". Il wordmark \"GEOM. / BRISSONI STEFANO\" è fatto nei font della base e convertito in tracciati "
    "vettoriali; favicon e icone sono una \"B\" avorio su antracite. All'apertura del sito un'intro mostra il "
    "logo una volta per sessione.", PM))

story.append(PageBreak())
# ================================================================= 2. errori
story.append(Paragraph("2. Errori corretti", H2))
story.append(Paragraph(
    "Errori trovati durante il lavoro (nel riempimento, nella base o sul sito attuale) e come sono stati "
    "sistemati.", PM))
ERRORI = [
    ("Cartella condivisa con un'altra sessione",
     "La prima copia della base era finita nella stessa cartella (base-tildestudio-3) usata in parallelo da "
     "un'altra sessione, a cui è stato cancellato per errore un node_modules a metà. Avvisata la sessione "
     "(npm install); il lavoro è stato rifatto in una cartella propria, brissoni/."),
    ("Dominio segnaposto",
     "Canonical, sitemap, robots e Open Graph puntavano a esempio.it. Ora il dominio arriva dalla variabile "
     "URL di Netlify: l'indirizzo .netlify.app, o il dominio del cliente appena collegato."),
    ("Sito in inglese",
     "La base veniva da un sito in inglese: testi, menu, form, etichette accessibili, lang, og:locale e "
     "dati strutturati portati in italiano, con le etichette della base originale."),
    ("Due sedi e due fondatori",
     "La base prevedeva Modena e Sevilla e due architetti. Ora una sede (Scanzorosciate), un professionista, "
     "un solo indirizzo nei dati strutturati, telefono e cellulare separati."),
    ("Residui del cliente precedente",
     "177 MB di foto, 35 redirect, segno grafico della fascia contatti, favicon e commenti di tìlde: tolti. Lo "
     "script check-residui ora cerca anche i termini di tìlde: 0 residui su 78 file."),
    ("Foto da telefono ruotate",
     "Gli scatti di cantiere hanno l'orientamento solo nei metadati EXIF: senza correzione uscivano coricati. "
     "Lo script le ruota prima di generare le varianti."),
    ("Titoli in minuscolo",
     "Sul sito attuale i nomi dei luoghi sono scritti in minuscolo (\"scanzorosciate (bg)\"): sistemate solo le "
     "maiuscole dei nomi propri, il resto è verbatim."),
    ("Titolo professionale",
     "Footer e dati strutturati del sito attuale dicono \"Geometra Ing.\": può far pensare a un ingegnere "
     "abilitato. Ovunque \"Geom. Brissoni Stefano\", iscritto all'albo n. 4716 (punto 8 della mappa)."),
    ("Stemma del Comune come logo",
     "Per il Geom. Matteo Morbi il sito attuale mostra lo stemma del Comune di Nembro: non è un suo logo e "
     "non si usa senza autorizzazione. Escluso; gli altri 7 loghi dei partner sono migrati."),
    ("Immagini non del cliente",
     "4 foto stock Wix (licenza valida solo su siti Wix) e 5 immagini dei servizi prese da altri siti: non "
     "migrate. I servizi usano le icone della base e le foto dei suoi cantieri."),
    ("Testo intro troppo lungo",
     "Il testo d'apertura (3 frasi) copriva la foto dell'hero su telefono: è andato nella sezione \"Chi sono\" "
     "della home; in hero restano titolo e claim."),
]
story.append(elenco(ERRORI))

story.append(PageBreak())
# ================================================================= 3. miglioramenti
story.append(Paragraph("3. Miglioramenti rispetto al sito attuale", H2))
MIGLIORIE = [
    ("Una pagina per realizzazione",
     "5 schede con intervento, luogo, anno e categoria, galleria con lightbox. Prima tutte le foto stavano "
     "in una sola pagina, senza dati."),
    ("Servizi spiegati",
     "9 servizi con pagina e ancora propria, testo ed elenco delle attività al posto delle card con foto "
     "stock; il form chiede di quale servizio si tratta."),
    ("Collaborazioni con link",
     "8 partner con descrizione, link al loro sito e 7 loghi."),
    ("Contatti completi",
     "Indirizzo, telefono, cellulare, email e PEC, mappa OpenStreetMap e indicazioni stradali. I dati "
     "strutturati del sito attuale non avevano né indirizzo né email."),
    ("Foto veloci",
     "9 foto a piena risoluzione in AVIF e WebP alle dimensioni giuste per ogni schermo (12 MB in tutto), "
     "caricate solo quando servono."),
    ("SEO e condivisione",
     "Titolo e descrizione per ogni pagina, dati strutturati (sede, professionista, servizi, realizzazioni), "
     "sitemap, robots.txt, llms.txt, Open Graph col logo."),
    ("Identità",
     "Logo, favicon e intro d'apertura al posto della favicon Wix e del banner \"This website was built on "
     "Wix\"."),
    ("Più pulito",
     "Niente cookie di profilazione, contrasti AA, link \"salta al contenuto\", animazioni disattivate per "
     "chi chiede di ridurre il movimento."),
]
righe = [[Paragraph("<b>cosa</b>", CELL), Paragraph("<b>perché conta</b>", CELL)]]
for tit, testo in MIGLIORIE:
    righe.append([Paragraph("<b>%s</b>" % tit, CELL), Paragraph(testo, CELL)])
story.append(tabella(righe, [36 * mm, 138 * mm]))

story.append(PageBreak())
# ================================================================= 4. stato
STATO = [
    ("Build", "verde: 19 pagine, nessun errore né warning", "ok"),
    ("Link e immagini", "1758 riferimenti interni controllati, 0 rotti", "ok"),
    ("Residui", "0 residui di tìlde e del cliente precedente su 78 file", "ok"),
    ("Netlify", "netlify.toml: Node 20, installazione senza lockfile (fix Astro 5.18), dominio da URL", "ok"),
    ("GitHub", "push su fadericosarghi23-ai/brissoni-, branch main", "ok"),
    ("Segnaposto visibili", "25 [[DA COMPILARE]] nel codice, alcuni visibili nelle pagine", "manca"),
    ("Dati legali", "P.IVA e denominazione legale: servono per footer e privacy", "manca"),
    ("Testi", "descrizioni delle 5 realizzazioni, aste giudiziarie, approccio, ricevimento", "manca"),
    ("Foto", "ritratto reale, immagine d'apertura migliore, loghi originali dei partner", "manca"),
    ("Dominio", "da collegare su Netlify: il sito si adatta da solo", "manca"),
    ("Form contatti", "senza endpoint apre la mail verso geom.brissoni@gmail.com", "per scelta"),
]
righe = [[Paragraph("<b>voce</b>", CELL), Paragraph("<b>stato</b>", CELL), Paragraph("<b>esito</b>", CELL)]]
for voce, stato, esito in STATO:
    col = "#2f6b3a" if esito == "ok" else ("#5a5951" if esito == "per scelta" else "#9b2c2c")
    righe.append([Paragraph("<b>%s</b>" % voce, CELL), Paragraph(stato, CELL),
                  Paragraph('<font color="%s"><b>%s</b></font>' % (col, esito), CELL)])
story.append(KeepTogether([
    Paragraph("4. Stato per il deploy", H2),
    tabella(righe, [34 * mm, 120 * mm, 20 * mm]),
    Spacer(1, 5),
    Paragraph(
        "<b>Prima di renderlo pubblico.</b> Finché ci sono segnaposto visibili e il sito Wix è online, "
        "l'anteprima Netlify conviene proteggerla con password, per non far indicizzare un sito incompleto. "
        "<b>Form.</b> Per Netlify Forms basta impostare form.netlify = true in src/data/site.ts, dopo aver "
        "completato la privacy con i dati legali. <b>Slot aperti:</b> npm run slots li elenca file per file.", PM),
]))


def costruisci(percorso, contenuto):
    d = BaseDocTemplate(percorso, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                        topMargin=21 * mm, bottomMargin=18 * mm,
                        title="Geom. Brissoni Stefano - palette, errori corretti e miglioramenti", author="BD Media")
    f = Frame(d.leftMargin, d.bottomMargin, d.width, d.height, id="corpo")
    d.addPageTemplates([PageTemplate(id="std", frames=[f], onPage=cornice)])
    d.build(copy.deepcopy(contenuto))
    return d.page


os.makedirs(os.path.dirname(OUT), exist_ok=True)
TOTALE[0] = costruisci(os.path.join(QUI, "_conteggio.pdf"), story)
costruisci(OUT, story)
os.remove(os.path.join(QUI, "_conteggio.pdf"))
shutil.copyfile(OUT, DESKTOP)
print("scritto", OUT, "e", DESKTOP, "-", TOTALE[0], "pagine")
