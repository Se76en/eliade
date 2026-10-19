# Mircea Eliade, 1907-1986

Un mic site static despre istoricul religiilor, scriitorul și filosoful român
Mircea Eliade. HTML, CSS și JavaScript simple. Fără pas de build, fără
dependențe, fără urmărire.

## Pagini

| Fișier | Ce conține |
| --- | --- |
| `index.html` | Prezentare: un scurt portret, repere, patru idei-cheie, o citare, opere alese și de unde să începi lectura |
| `biography.html` | Șase capitole: București, Calcutta, anii legionari, Lisabona, Paris, Chicago, plus o secțiune despre receptare și controversa politică |
| `ideas.html` | Zece concepte de bază (hierofanie, axis mundi, eterna reîntoarcere, șamanism și celelalte), fiecare cu lucrarea în care este dezvoltat |
| `works.html` | O bibliografie filtrabilă de 23 de titluri: istorii ale religiilor, ficțiune, memorii și jurnale |

## Structură

```
Prj/
  index.html
  biography.html
  ideas.html
  works.html
  css/style.css
  js/main.js
  assets/
    fonts/   EB Garamond și Public Sans, găzduite local (subseturi latin și latin extins)
    img/     fotografii și scanări de pe Wikimedia Commons
```

## Cum îl deschizi

Dublu clic pe `index.html`, sau servește folderul:

```
python -m http.server 8000
```

Apoi deschide http://localhost:8000. Totul funcționează și offline, direct de
pe disc; fonturile și imaginile sunt stocate local.

## Funcționalități

- Temă deschisă și întunecată, reținută în localStorage, care urmează
  preferința sistemului până când vizitatorul alege explicit.
- Dezvăluire lină la derulare, omisă complet pentru vizitatorii care preferă
  mișcarea redusă.
- Filtru pe pagina de opere, cu numărătoare în timp real și stare de listă goală.
- Responsiv până la telefoane mici; foaie de stil pentru tipărire inclusă.

## Credite pentru imagini

Toate imaginile provin de pe Wikimedia Commons.

- Portretul tânărului Mircea Eliade. Domeniu public.
- Marcă poștală românească, 1995, desen de E. Palade. Domeniu public.
- Casa Eliade din București, fotografie de AndreiOM. Domeniu public.
- Manuscris pe frunză de palmier al Rigvedei, fotografie de Ms Sarah Welch. CC0.
- Manuscris pe frunze de palmier al Padma Purana, Nepal, secolul al XVII-lea. Domeniu public.
- Swift Hall, Universitatea din Chicago, fotografie de Mx. Granger. CC0.
- Bust pe Aleea Clasicilor, Chișinău, fotografie de Zserghei. Domeniu public.

Fiecare imagine de pe site este în domeniul public sau CC0.

## Note despre conținut

Textul este alcătuit din surse biografice și bibliografice publicate și este
scris pentru publicul general, nu pentru citare. Datele sunt datele primei
publicări. Asocierea lui Eliade cu Legiunea Arhanghelului Mihail din anii 1930
este tratată deschis pe pagina de biografie.
