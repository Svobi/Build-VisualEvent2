# Build-VisualEvent2
## To Build VisualEvents2 with npm do this:

You need to have installed 
#### * nodejs . https://nodejs.org
#### * git . https://git-scm.com
#### * grunt-cli installed global 
```sh
npm install -g grunt-cli
```

### 1. Install all necessary node modules
```sh
$ npm update
```
This will download the node modules for building VisualEvent2

### 2. Load the actual sources of VisualEvent2
```sh
$ npm run init
```
This will clone the github repository to a subdirectory

### 3. Build the final soures for your webserver
```sh
$ grunt default --webserverUrl="www.yourwebserverURL.com"
```
This builds a plain (Webserver Root install) installation for your own server.
You got an option for creating a subdirectory Version of VisualEvent :
```sh
$ grunt default --webserverUrl="www.yourwebserverURL.com" --webserverSubdir="ausefullsubdirectoryname"
```
It will create a subdirectory based build.


### 4. Copy the files/directory to your server
If you made a flat/plain build (no subdirectory argument) then copy the files out of the plain directory in the build directory to your webserver root directory and switch to your browser. Open www.yourwebserverurl.com/bookmarklet.html and you can move the link to your bookmarks.

If you used the webserverSubdir argument, copy the created subdirectory out of the build directory to your root Webserver directory.
Open www.yourwebserverurl.com/webserverSubdir/bookmarklet.html and you can move the link to your bookmarks.

DONE!
