# Header
- Image (adaptée à la version desktop et la version mobile)
- titre
- Tags
- Date de publication
- Auteur
- Chapeau

- Main (ce qui va contenir le body de mon article)
- Aside (qui peut contenir un encadré)
- Footer (qui peut contenir des notes de bas-de-page)

```html
<head>
	<title>Titre optimisé de ton article | titre site</title>
	<meta name="description" content="Description concise et engageante. Experpt">
	<meta property="og:title" content="Titre pour les réseaux sociaux"> 
	<meta property="og:description" content="Description pour les réseaux sociaux.">
	<meta property="og:image" content="URL-de-l-image.jpg">
	<script type="application/ld+json"> 
		{ 
		"@context": "https://schema.org", 
		"@type": "Article", 
		"headline": "Titre de ton article", 
		"description": "Description courte et engageante de ton article", 
		"author": 
			{ 
			"@type": "Person", 
			"name": "Laurent De Saedeleer" 
			},
		 "datePublished": "2025-12-02", "dateModified": "2025-12-02",
		 "image": "https://ton-site.com/url-de-l-image.jpg",
		  "publisher": 
			  { 
			  "@type": "Organization", 
			  "name": "Nom de ton site ou entreprise", 
			  "logo": 
				  { 
				  "@type": "ImageObject", 
				  "url": "https://ton-site.com/url-du-logo.jpg" 
				  } 
			  }, 
		  "mainEntityOfPage": 
			  { 
			  "@type": "WebPage", 
			  "@id": "https://ton-site.com/url-de-l-article" 
			  } 
		} 
	  </script>
</head>

<body>
	<article>
		<header>
			<figure>
				<picture>
				  <source
				    srcset="/shared-assets/images/examples/surfer.jpg"
				    media="(orientation: portrait)" />
				  <img src="/shared-assets/images/examples/painted-hand.jpg" alt="An elephant at sunset" />
				</picture>
				 <figcaption>An elephant at sunset – ©Name</figcaption>
			</figure>
			<h2>title</h2>
			<ul class="tags"><li>tag</li></ul>
			<time datetime="2025-07-07" pubdate>07 Juillet 2025</time>
			<p>auteur</p>
			<div class="chapo">Chapô</div>	
		</header>
		<main></main>
		<aside>Encadré</aside>
		<footer>
			<ol>
				<li id="note1"> 
					<span>[1] </span> 
					<a href="link">lien externe</a> 
					<a href="#ref1" aria-label="Retour au texte">↩</a>
				</li>
			</ol>
		</footer>
	</article>
</body>
```

# Éléments de contenu pour l'éditeur

## Intertitre
```html
<h3>intertitre</h3>
```

```markdown
### intertitre
```

## Citation

```html
<blockquote cite="">
<p>citation<p>
<p>nom <cite>oeuvre</cite></p>
</blockquote>
```

```markdown
--- proposition ---
:::citation|Nom, *"oeuvre"*:::
```
## Relance

```html
<p class="pullquote">texte</p>
```

```markdown
--- proposition ---
:::pullquote:::
```

## Texte
### Insertion de note
```html
<sup><a href="#note1" id="ref1">1</a></sup>
```

```markdown
[^1]
```

```html
<li id="note1"> 
	<span>[1] </span> 
	<a href="link">note</a> 
	<a href="#ref1" aria-label="Retour au texte">↩</a>
</li>
```

```markdown
[^1]:note
```

```markdown
--- proposition pour cumuler les deux en une ligne ---
[^1]:note
ou
[^1]:[label](lien)
```

### Strong###
```html
<strong>texte</strong>
```

```markdown
**texte**
```

### Emphase
```html
<em>texte</em>
```

```markdown
*texte*
```

### Strong avec emphase

```html
<strong><em>texte</em></strong>
```

```markdown
***texte***
```

### Élément de citation, titre d'une œuvre

```html
<cite>texte</cite>
```

```markdown
--- proposition ---
*"texte"*
```
### Abréviation
```html
<abbr title="Cascade Style Sheet">CSS</abbr>
```

```markdown
[[abbr CSS|Cascade Style Sheet]]
```

### Définition

```html
<dfn title="Un langage de balisage léger">Markdown</dfn>
```

```markdown
[[dfn Markdown|Un langage de balisage léger]]
```

### Date

```html
<time datetime="2023-12-25">25 décembre 2023</time>
```

```markdown
[[time 2023-12-25|YYYY-MM-DD]]
```

### Texte secondaire

```html
<small>texte</small>
```

```markdown
[[small texte]]
```
### Surligné

```html
<mark>texte</mark>
```

```markdown
==texte==
```

### Lien

```html
<a href="link">texte</mark>
```

```markdown
[texte](link)
```

### Élément de liste

```html
<ul>
	<li>texte</li>
</ul>
```

```markdown
- texte
```

## Image

```html
<figure>
	<picture>
		<source
			srcset="/shared-assets/images/examples/surfer.jpg"
			media="(orientation: portrait)" />
			<!-- Fallback -->
		<img src="/shared-assets/images/examples/painted-hand.jpg" alt="An elephant at sunset" />
	</picture>
	<figcaption>An elephant at sunset – ©Name</figcaption>
</figure>
```

```markdown
--- proposition---
![[image.jpg]]

--- remarque---
va chercher un objet préalablement enregistré ou à définir dans la banque de medias : 

{
source:
	{
		srcset:"/shared-assets/images/examples/surfer.jpg",
		media:"(orientation: portrait)",
	},
image:
	{
		src="/shared-assets/images/examples/painted-hand.jpg",
		alt="An elephant at sunset"	
	},
figcaption: "An elephant at sunset – ©Name"
}

Ce qui suppose d'enregistrer l'image ou le media dans un formulaire contextuel
src:
src mobile :
alt:
caption : 

En tenant compte de la largeur pour desktop et mobile :
![[image_desktop_url|250, image_mobile_url|full]]

```

```js
function parseResponsiveImageMarkdown(markdown) { 
	const imageRegex = /!\[\[([^\|]+)\|(\d+),\s*([^\|]+)\|full\]\]/g; 
	return markdown.replace(imageRegex, (match, desktopPath, desktopWidth, mobilePath) => { 
	return ` 
	<figure> 
	<picture> 
		<!-- Image mobile (100% de la largeur) --> 
		<source 
			media="(max-width: 767px)" 
			srcset="${mobilePath}" 
			style="width: 100%;" /> 
		<!-- Image desktop (largeur max de ${desktopWidth}px) --> 
		<source 
			media="(min-width: 768px)" 
			srcset="${desktopPath}" /> 
			<!-- Fallback (image par défaut) --> 
		<img 
			src="${desktopPath}" 
			alt="Description de l'image" 
			style="max-width: ${desktopWidth}px; width: 100%;" /> 
	</picture> 
	<figcaption>Légende de l'image – ©Nom</figcaption> </figure> `
	; 
	}); 
} 

// Exemple d'utilisation : const markdownContent = ` Voici une image responsive : ![[/shared-assets/images/examples/painted-hand.jpg|250, /shared-assets/images/examples/surfer.jpg|full]] `; console.log(parseResponsiveImageMarkdown(markdownContent));
```

Résultat généré :
```html
<figure> 
	<picture> 
	<!-- Image mobile --> 
		<source media="(max-width: 767px)" srcset="/shared-assets/images/examples/surfer.jpg" style="width: 100%;" /> 
		<!-- Image desktop --> 
		<source media="(min-width: 768px)" srcset="/shared-assets/images/examples/painted-hand.jpg" /> <!-- Fallback --> 
		<img src="/shared-assets/images/examples/painted-hand.jpg" alt="Description de l'image" style="max-width: 250px; width: 100%;" /> 
	</picture> 
	<figcaption>Légende de l'image – ©Nom</figcaption> 
</figure>
```

## Slider (carrousel)

```markdown
--- suggestion ---
![[slider|250, full
[image_desktop_url, image_mobile_url],
[image_desktop_url, image_mobile_url],
[image_desktop_url, image_mobile_url]
]]
```

## Galerie d'image

```markdown
--- suggestion ---
![[gallery|4col, 2col
[image_desktop_url, image_mobile_url],
[image_desktop_url, image_mobile_url],
[image_desktop_url, image_mobile_url],
]]
```

## Image vectorielle (SVG) ou interactive

```html
<figure class="svg-container"> 
	<object 
		type="image/svg+xml" 
		data="/images/logo.svg" 
		width="200" 
		height="100" 
		aria-label="Logo de l'entreprise" 
		class="logo-svg"> 
		Votre navigateur ne supporte pas les SVG. 
	</object> 
	<figcaption>Logo de l'entreprise</figcaption>
 </figure>
```

```html
<figure class="svg-interactive">
	<object 
		type="image/svg+xml" 
		data="/graphs/animated-chart.svg" 
		width="600" 
		height="400" 
		aria-label="Graphique animé des ventes 2023" 
		class="sales-chart" 
		id="svg-animated-chart"> 
		Votre navigateur ne supporte pas les SVG. 
	</object>
	<figcaption>Graphique animé des ventes 2023</figcaption>
	<script src="/js/chart-animation.js" defer></script>
</figure>
```

## Video et audio
Vers quoi part-on ?

## Code
Vers quoi part-on ?
```html
<code>texte</code>
```

```markdown
`code`{:language}
```

## Expression mathématique
En utilisant LaTeX ?


## Menu (avec ancres nommées)
Le menu d'un article se met au-dessus du contenu et qui permet de naviguer entre les points importants d'un article assez long. Il utilise des ancres nommée qui seront les h2. Le menu est en position "sticky" et il utilise un scroll-spy. 

```markdown
--- proposition ---
[[menu]]
```

```html
<menu>
	<li><href="#section-1">titre h2</a></li>
	<li><href="#section-2">titre h2</a></li>
	<li><href="#section-3">titre h2</a></li>
</menu>
```

Ce qui suppose, pour un article d'ajouter aux h2 une id crée automatiquement

```html
<section id="section1"><h2>titre</h2></section>
```

Même principe que pour les notes de bas-de-page.

## Callout

```markdown
> [!question] titre callout
> contenu ligne 1
> contenu ligne 2
```

```html
<aside class="callout">
	<h3>titre callout</h3>
	<p> contenu ligne 1</p>
	<p> contenu ligne 2</p>
</aside>
```

## Folding Callout

```markdown
> [!question]- titre folding callout
> contenu ligne 1
> contenu ligne 2
```

```html
<aside class="folding-callout">
	<details>
		<summary>titre folding callout</summary>
		<p> contenu ligne 1</p>
		<p> contenu ligne 2</p>
	<details>
</aside>
```
## Accordion

```markdown
--- Proposition ---
[[accordion
> [!question]- titre callout
> contenu
> > [!info]- titre callout
> contenu
> > [!tip]- titre callout
> contenu
]]
```

```html
<aside class="accordion">
	<details>
		<summary>titre section 1</summary>
		<p> contenu</p>
	<details>
	<details>
		<summary>titre section 2</summary>
		<p> contenu</p>
	<details>
	<details>
		<summary>titre section 3</summary>
		<p> contenu</p>
	<details>
</aside>
```

>[!info] Résumé en l'état avec Mistral
>[conversation](https://chat.mistral.ai/chat/3bc5bbd1-fc9e-453c-8028-0bcae6c2877e)
>Discussion à suivre...


