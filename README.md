# Cordova Push Notifications Plugin for Android - Amazon Fire OS

## DESCRIPTION

This plugin is for use with [Cordova](http://incubator.apache.org/cordova/), and allows your application to receive push notifications on Android - Amazon Fire OS
* The Amazon Fire OS implementation uses [Amazon's ADM(Amazon Device Messaging) service](https://developer.amazon.com/sdk/adm.html).

### Contents

- [LICENSE](#license)
- [Installation](#installation)

## <a name="license"></a> LICENSE

	The MIT License

	Copyright (c) 2012 Adobe Systems, inc.
	portions Copyright (c) 2012 Olivier Louvignes

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

* ATTENTION: This is just a fix of the original phonegap plugin implemented by Olivier Louvignes (https://github.com/phonegap-build/PushPlugin) that became deprecated. Nevertheless, all the credits should be awarded to him.

## <a name="installation"></a> Installation
1) Install the plugin like you normally would for any phonegap project. You may install it through cordova, if so, change "phonegap" to "cordova" (you must have cordova installed).

```xml
phonegap plugin add [plugin folder or plugin git repository]
```

2) Add the amazon namespace to your AndroidManifest.xml
Namespace: 
```xml
xmlns:amazon="http://schemas.amazon.com/apk/res/android"
```

3) In case the build.gradle file did not get updated with the latest dependencies, please, manually update your application's build.gradle file and add the ADM library dependency as compileOnly. 

The ADM library is automatically added to your project under the libs/ folder. Pay attention to the following tasks and complete just one of the options accordingly to your needs/project structure.

* A) If you don't have more external libraries under the libs/ folder, then you may just comment the fileTree implementation line and add the compileOnly dependency for the ADM messaging service, as shown below:

```xml
dependencies {
    //implementation fileTree(dir: 'libs', include: '*.jar')
    // SUB-PROJECT DEPENDENCIES START
    implementation(project(path: ":CordovaLib"))
    compile "com.android.support:support-v4:24.1.1+"
    compileOnly files('libs/amazon-device-messaging-1.0.1.jar')
    // SUB-PROJECT DEPENDENCIES END
}
```
* B) However, if you have more external libraries that require the dependency implementation through the fileTree function (implementation fileTree(dir: 'libs', include: '*.jar')), you should change the Amazon's library to another folder and update the gradle dependencies as shown below:

```xml
dependencies {
    implementation fileTree(dir: 'libs', include: '*.jar')
    // SUB-PROJECT DEPENDENCIES START
    implementation(project(path: ":CordovaLib"))
    compile "com.android.support:support-v4:24.1.1+"
    compileOnly files('[NEWFOLDER]/amazon-device-messaging-1.0.1.jar')
    // SUB-PROJECT DEPENDENCIES END
}
```

