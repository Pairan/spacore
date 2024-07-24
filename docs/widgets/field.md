# Field (spa-field / form-grid)
Sometimes input fields need to me a bit more fancy than the browser default. The approach was to make an field container, that takes almost no markup and keeps playing nice to web defaults.

Along with `.spa-field` comes `.form-grid` which makes a nice wrap around label and field. 

## Variables
```css
--spa-field-padding: 0.5rem 1rem;
--spa-field-background: #fff;
--spa-field-border-color: #aaa;
--spa-field-border: 1px solid var(--spa-field-border-color);
--spa-field-border-radius: 5px;
--spa-field-height: 2rem;
--spa-field-invalid-border-color: red;
--spa-field-valid-border-color: rgb(16, 188, 0);
```

## Usage
```html
<div class="form-grid">
    <label>Your label text</label>
    <div class="spa-field">
        <input type="text" name="controlName">
    </div>
</div>
```