import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';

const parse = require('html-react-parser');
// const translates = require('@vitalets/google-translate-api');

const Translate: React.FC = () => {
  const translator = new YandexTranslator();

  //getting urls from redux sent from search component.
  const nonEnUrlReduxString: string = useAppSelector(
    (state) => state.nonEnUrlString.value
  );
  const enUrlReduxString: string = useAppSelector(
    (state) => state.enUrlString.value
  );

  const [slurpedEnText, setSlurpedEnText] =
    React.useState<string>('<h1>single</h1>');
  const [slurpedNonEnText, setSlurpedNonEnText] =
    React.useState<string>('<h1>single</h1>');

  const enParsedText = parse(slurpedEnText);
  const nonEnParsedText = parse(slurpedNonEnText);

  const enapi = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${enUrlReduxString}`;

  const nonenapi = `https://de.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=${nonEnUrlReduxString}`;

  const Clicked = async () => {
    try {
      // console.log(enapi);
      const enpage = await fetch(enapi);
      const enresults = await enpage.json();

      //get wikipedia ID from the fetch
      const myEnObj = enresults.query.pages;
      const enkeys = Object.keys(myEnObj);
      const enwikipediaID = enkeys[0];
      const theenContent = myEnObj[enwikipediaID].extract.toString();
      setSlurpedEnText(theenContent);

      //NON ENGLISH
      // console.log(nonenapi);
      const nonenpage = await fetch(nonenapi);
      const nonenresults = await nonenpage.json();

      //get wikipedia ID from the fetch
      const mynonEnObj = nonenresults.query.pages;
      const nonenkeys = Object.keys(mynonEnObj);
      const nonenwikipediaID = nonenkeys[0];
      const thenonenContent = mynonEnObj[nonenwikipediaID].extract.toString();

      console.log(thenonenContent.length)

      let sendIt = '';
      const doinit = await translator
        .translate(thenonenContent.slice(0, 5000), 'de', 'en')
        .then((translate) => (sendIt = translate));
      setSlurpedNonEnText(sendIt);
    } catch (error) {
      console.log(`bad fetch or request or something: ${error}`);
    }
  };

  React.useEffect(() => {
    console.log(nonEnUrlReduxString);
    console.log(enUrlReduxString);

    //   translates('Ik spreek Engels', {to: 'en'}).then(res => {
    //     console.log(res.text);
    //     //=> I speak English
    //     console.log(res.from.language.iso);
    //     //=> nl
    // }).catch(err => {
    //     console.error(err);
    // });
    // translator
    //   .translate('Hello world I am Fat', 'en', 'de')
    //   .then((translate) => console.log('Translate result', translate));
  }, []);

  return (
    <>
      <h1>Translated</h1>

      <button onClick={() => Clicked()}>go fetch</button>

      <div className="translated-text">
        <div className="tt-div">
          {enUrlReduxString}
          <br></br>

          {enParsedText}
        </div>
        <div className="tt-div">
          {nonEnUrlReduxString}
          <br /> <br />
          {nonEnParsedText}
        </div>
      </div>
    </>
  );
};

export default Translate;
