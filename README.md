# jquery.readall

jQuery plugin to shrink large blocks of content and place a "read more" / "read less" button below.

## Demo
[Simple demo](http://www.morriz.net/demo/jquery.readall/examples/example1.html)

## Usage
Include *jquery.readall.css* on the page and *jquery.readall.js* (after jQuery) and set it to the objects you want to affect.
```
...
<link href="jquery.readall.css" rel="stylesheet" />
...
<script src="jquery.js"></script>
<script src="jquery.readall.js"></script>
<script>
//Standard options
    $(element).readall();
    //Set options
    var options = {
        showheight: 109, 
        btnTextShowmore: 'More...', 
        btnTextShowless: 'Less...'
    }
    $(element).readall(options);
</script>

```

## Options
```
var options = {
    // Default values
    showheight: 96,                         // height to show
    showrows: null,                         // rows to show (overrides showheight)
    animationspeed: 200,                    // speed of transition
    btnTextShowmore: 'Read more',           // text shown on button to show more
    btnTextShowless: 'Read less',           // text shown on button to show less
    btnClassShowmore: 'readall-button',     // class(es) on button to show more
    btnClassShowless: 'readall-button'      // class(es) on button to show less
}
```
## Versions
1.2: Replaced deprecated JQuery functions and event shorthands

1.1: Changed option-parameters for buttons to improve setup and some bugfixes

1.0: Initial release

## License
Copyright &copy; 2021 Anders Fj&auml;llstr&ouml;m, licensed under the MIT License 
