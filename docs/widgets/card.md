# Card widget (spa-card)

A card is a simple container with some settings separating the content from the backgroun.

## Variables

```css
--spa-card-border: 1px solid rgba(0, 0, 0, 0.3);
--spa-card-border-radius: 5px;
--spa-card-bg-color: #fff;
--spa-card-padding-top-bottom: 0.5rem;
--spa-card-padding-left-right: 1rem;
--spa-card-padding: var(--spa-card-padding-top-bottom) var(
    --spa-card-padding-left-right
  );
```

## Usage

```html
<div class="spa-card">
  <h2>Card headline</h2>
  <!-- ### you can add an optional area where buttons or such can be placed ### -->
  <div class="spa-card-actions">
    <button>optional features</button>
  </div>
  Here goes the content of the card
</div>
```
