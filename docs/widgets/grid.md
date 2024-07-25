# Grid (spa-grid)
`.spa-grid-x` is made to solve the probably most used layout: equal size columns within a row.
## Variables
```css
--spa-grid-gap: 1rem;
```
### Usage
You can define everything from 2 columns (`spa-grid-2`) to 8 columns (`spa-grid-8`).
```html
<!-- ### defining a 3 column row ### -->
<div class="spa-grid-3">
    <span>1st column</span>
    <span>2nd column</span>
    <span>3rd column</span>
</div>

<!-- ### defining a 8 column row ### -->
<div class="spa-grid-8">
    <span>1st column</span>
    <span>2nd column</span>
    <span>3rd column</span>
    <span>4th column</span>
    <span>5th column</span>
    <span>6th column</span>
    <span>7th column</span>
    <span>8th column</span>
</div>
```
Focus is to make things easy ... and as such let's directly jump into the example. If you would need a row with two columns, then you would add a `spa-grid-2` as class to the parent element. If you wanted 5 then it would be `spa-grid-5`. That's all there is to it!