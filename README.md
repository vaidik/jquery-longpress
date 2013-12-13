# longpress: a jQuery plugin

Longpress is a jQuery plugin that makes it easy to support long press
events on mobile devices and desktop borwsers.

## Native Library

If you want something native and more low level than the jQuery implementation,
take a look at [longpress.js][lp] that is also written by me.

[lp]: https://github.com/vaidik/longpress.js

## Quick Usage

```html
<script type="text/javascript" src="jquery.longpress.js"></script>
```

```js

$('#button').longpress(function() {
    // longpress callback
    alert('You just longpress-ed a button.');
});

```

### Detailed Usage

**.longpress(longpressHandler(event)[, shortpressHandler(event), duration])**
<table>
    <tr>
        <td>longpressHandler(event)</td>
        <td>Required</td>
        <td>
            Type: Function()  
            A function to execute each time someone longpresses something.
        </td>
    </tr>
    <tr>
        <td>shortpressHandler(event)</td>
        <td>Optional</td>
        <td>
            Type: Function()
            A function to execute each time someone releases the mouse or touch before the longpress duration elapses.
        </td>
    </tr>
    <tr>
        <td>duration</td>
        <td>Optional</td>
        <td>
            Type: Integer
            longpress duration in milliseconds.
        </td>
    </tr>
</table>

**Example:**

```js
$('#button').longpress(function(e) {
    alert('You just longpressed something.');
}, function(e) {
    alert('You released before longpress duration and that\'s why its a shortpress now.');
});
```

## Author

[Vaidik Kapoor](http://vaidikkapoor.info) ([@vaidikkapoor](http://twitter.com/vaidikkapoor))

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2008-2013, Vaidik Kapoor (kapoor [*dot*] vaidik -[at]- gmail [*dot*] com)
