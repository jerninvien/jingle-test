## Jingle Test

Jingle Test is hosted on AWS S3 [here](http://jingle-joke-test.s3-website.eu-central-1.amazonaws.com/).

### Notes

Jokes were scraped from AWS to a local file using this node script: [jokes.js](https://gist.github.com/jerninvien/74250a8616b267f60a27b5da2560c57e).

Jingle-Test did not require Redux or React Router. Normally I use public interface imports in `src/components/index.js`, but couldn't set that up in time. This would have simplified `import` / `export` syntax.

NLP was done simply using the [compromise](https://github.com/spencermountain/compromise) package. It was used to search for nouns in the joke text. Simply changing the URL query params avoided the need to use an http client (e.g. `axios`) and dealing with `CORS` issues:

```javascript
import nlp  from 'compromise';
const nlpOnJoke = nlp(jokeSetup + ' ' + jokePunchline);
const filteredNouns = nlpOnJoke.nouns().out('text').split(' ').filter(w => w.length > 2);
const randomNoun = filteredNouns[filteredNouns.length * Math.random() << 0] || "";

setTimeout(() => {
  this.setState({ imageSource: lo remflickrURL+randomNoun });
}, 250 + Math.random()*1000);
```


Changing the URL in state triggers re-rendering and a new search to an external image API:

```javascript
https://loremflickr.com/640/480/${imageSource}
```

The noun that triggers new searches is logged to the console. Please enjoy the NLP magic there.

A static gif was used for the animated effect. Directly copying the [Dad Jokes](https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke) animation would have taken approximately 4-6 hours extra work. Creating a fully customised animation would have required approximately 2-4 days of hardcore HTML / CSS grinding.

Finally, the styling was done with default `css`, but using `sass` or `scss` can provide more options.



### Folder Structure

```
jingle-test/
  README.md
  package.json
  yarn.lock
  build/
    static/
      css/
      js/
      media/
  node_modules/
  public/
  src/
    assets/
    components/
      JokeText/
      LightBox/
      Timer/
    data/
      jokes.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```
