RunIn
=====

By Rémino Rem <https://remino.net>

Small library to run snippets of HTML, CSS, and JavaScript in place.

<https://remino.net/runin/>

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [To Do](#to-do)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



## About

https://user-images.githubusercontent.com/29999/210556744-519eccd4-27c2-4f58-a9a3-37f2837338b8.mp4

**RunIn** is a small library that allows you to run snippets of HTML, CSS, and JavaScript in place. Write your code in your HTML page as plain text, and have this library run it on the page for you.

[Back to top](#runin)



## Getting Started

You can either clone the repo, download the [latest release file](https://github.com/remino/runin/releases), or install it using npm:

```sh
# Clone the repo
git clone git@github.com:remino/runin.git

# Install using npm
npm add @remino/runin
```

[Back to top](#runin)



## Usage

**Step 1.** Write your code on the page.

```html
<textarea id="html">
	<h1>Hello, World!</h1>
</textarea>

<textarea id="css">
	.red {
		color: red;
	}
</textarea>

<textarea id="js">
	document.querySelector('h1').classList.add('red');
</textarea>

<output id="output"></output>
```

**Step 2.** Add the `RunIn` element.

```html
<run-in html="#html" css="#css" js="#js" output="#output"></run-in>
```

**Step 3.** Add the auto-start script.

```html
<script src="runin-auto.min.js"></script>
```

**Step 4.** Run in!

The "Run In" button will appear on the page. Click it to run the code.

[Back to top](#runin)


## To Do

This library is mainly for personal purposes at the moment, but I'd like to expand on it for others to enjoy its benefits.

For others to feel more confident in using this, here are a few things to do:

- Add automated tests. (Not sure how to do that yet.)
- Add better documentation. (There are a few features this library does that is not documented here yet.)
- Add more examples.

[Back to top](#runin)


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

[Back to top](#runin)



## License

Distributed under the ISC License. See `LICENSE.txt` for more information.

[Back to top](#runin)



## Contact

Rémino Rem
https://remino.net/

[Back to top](#runin)
