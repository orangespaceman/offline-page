# Offline Page

A simple example of an offline page using a service worker.

This offline page is self-contained, with no external dependencies.


## Online page

The service worker needs installing from somewhere within the website:

```
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
```

Set the correct path to the `service-worker.js` file.


## service-worker.js

Set the path to the offline page in two places:

```
required: ["/offline/"]
...
return caches.match("/offline/");
```


## Offline page

The inline base64-encoded image can be [generated online](https://www.base64-image.de/)


---

## Maintenance and support

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

---

## License

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.

```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.

```