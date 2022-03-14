import React, { useState } from 'react';

const Brk: React.FC = () => (
   <>
      <br />
      <br />
   </>
);
export const Opposites: React.FC = props => {
   const [oppo, setOppo] = useState('');
   const [tradOppo, setTradOppo] = useState('');
   const [rev, setRev] = useState('');
   const [showMe, setShowMe] = useState(false);
   function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const val = event.target.value;
      if (!!val) {
         const opposites = [...val]
            .map(letter => indexHalvingOpposite(letter))
            .join('');
         setOppo(opposites);
         setRev([...val].reverse().join(''));
         setTradOppo(
            [...val].map(letter => traditionalOpposite(letter)).join('')
         );
      } else {
         setOppo('');
         setTradOppo('');
         setRev('');
      }
   }

   const resultContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   };
   const letterLine: React.CSSProperties = {
      whiteSpace: 'pre',
      maxWidth: '100%',
      width: 'auto',
      display: 'inline-block',
      overflowX: 'auto',
      backgroundColor: '#eee',
      padding: '10px 20px 5px 20px',
      fontSize: 13,
      WebkitOverflowScrolling: 'touch'
   };
   const resultText: React.CSSProperties = { marginLeft: 10 };
   const labelText: React.CSSProperties = { fontSize: '85%' };
   return (
      <div style={{ fontSize: '.65rem', margin: 40 }}>
         <p>
            <input placeholder={'Type Something!'} onChange={onChange} />
         </p>
         {!!oppo && (
            <div style={{ fontSize: '1rem' }}>
               <div style={resultContainerStyle}>
                  <div style={labelText}>distance:</div>
                  <div style={resultText}>{oppo}</div>
               </div>
               <div style={resultContainerStyle}>
                  <div style={labelText}>inverse:</div>
                  <div style={resultText}>{tradOppo}</div>
               </div>
               <div style={resultContainerStyle}>
                  <div style={labelText}>reverse:</div>
                  <div style={resultText}>{rev}</div>
               </div>
            </div>
         )}
         <h3 style={{ marginTop: 100 }}>How does it work?</h3>
         <a href='javascript:void(0)' onClick={() => setShowMe(!showMe)}>
            {!showMe ? `Show Me` : `Ok, enough`}
         </a>
         {showMe && (
            <div
               style={{
                  textAlign: 'left',
                  width: '100%',
                  maxWidth: 1200,
                  margin: 'auto',
                  marginTop: 40
               }}
            >
               First, a couple of groundrules so we don't end up with gibberish:
               <ol>
                  <li>Consonants are always replaced with consants</li>
                  <li>Vowels are always replaced with vowels</li>
               </ol>
               <h3>Letter Pools:</h3>
               With the groundrules in place, we have two "letter pools" -- 20
               consonants and 6 vowels. Each is indexed using a zero-based
               index. All replacements for a given letter take place within
               their respective letter pool.
               <h3>Inverse:</h3>
               This is probably what you think of when you imagine opposites of
               a given letter. A simple inverse index method:
               <Brk />a {'->'} z, b {'->'} y ... etc.
               <Brk />
               If we modify that to adhere to our groundrules, then: <Brk /> a{' '}
               {'->'} y, b {'->'} z, c {'->'} x ... etc.
               <Brk />
               This method makes intuitive sense, but tends to output pretty
               gibberish-y words which I think is due to the way english favors
               certain letters and when you simply replace those frequently used
               letters with their inverse, it stops making sense. Unlucky I
               suppose.
               <h3>Distance:</h3>
               This one is a bit of a different take, but tends to output more
               interesting and believable words. Basically we look for the
               letter that is half the letter pool away; seeking either forward
               or backward depending on if we get a letter in the first or
               second half of the pool.
               <Brk />
               Let's try the letter <code>g</code>:
               <ol>
                  <li>
                     Within the consonant letter pool, <code>g</code> has an
                     index of <code>4</code>.
                  </li>
                  <li>
                     <code>g</code> is in the first half of the pool so we do{' '}
                     <code>4 + (20 / 2) = 14</code>
                  </li>
                  <li>
                     The letter at index 14 = <code>s</code>
                  </li>
               </ol>
               <div style={letterLine}>
                  {`0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 `}
                  <div style={{ marginTop: 6 }}></div>
                  {`b   c   d   f   g   h   j   k   l   m   n   p   q   r   s   t   v   w   x   z `}
                  <div style={{ marginTop: 6 }}></div>
                  <strong>{`                ^                                       ^              `}</strong>
               </div>
               <Brk />
               Let's try the letter <code>t</code>:
               <ol>
                  <li>
                     Within the consonant letter pool, <code>t</code> has an
                     index of <code>15</code>.
                  </li>
                  <li>
                     <code>t</code> is in the last half of the pool and the pool
                     length is 20, so we do <code>15 - (20 / 2) = 5</code>
                  </li>
                  <li>
                     The letter at index 5 = <code>h</code>
                  </li>
               </ol>
               <div style={letterLine}>
                  {`0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 `}
                  <div style={{ marginTop: 6 }}></div>
                  {`b   c   d   f   g   h   j   k   l   m   n   p   q   r   s   t   v   w   x   z `}
                  <div style={{ marginTop: 6 }}></div>
                  <strong>{`        ^                                       ^`}</strong>
               </div>
               <Brk />
               Let's try the letter <code>a</code>:
               <ol>
                  <li>
                     Within the vowel letter pool, <code>a</code> has an index
                     of <code>0</code>.
                  </li>
                  <li>
                     <code>a</code> is in the first half of the pool and the
                     pool length is 6, so we do <code>0 + (6 / 2) = 3</code>
                  </li>
                  <li>
                     The letter at index 3 = <code>o</code>
                  </li>
               </ol>
               <div style={letterLine}>
                  {`0   1   2   3   4   5`}
                  <div style={{ marginTop: 6 }}></div>
                  {`a   e   i   o   u   y`}
                  <div style={{ marginTop: 6 }}></div>
                  <strong>{`^           ^`}</strong>
               </div>
               <Brk />
               Let's try the letter <code>u</code>:
               <ol>
                  <li>
                     Within the vowel letter pool, <code>u</code> has an index
                     of <code>4</code>.
                  </li>
                  <li>
                     <code>u</code> is in the last half of the pool and the pool
                     length is 6, so we do <code>4 - (6 / 2) = 1</code>
                  </li>
                  <li>
                     The letter at index 1 = <code>e</code>
                  </li>
               </ol>
               <div style={letterLine}>
                  {`0   1   2   3   4   5`}
                  <div style={{ marginTop: 6 }}></div>
                  {`a   e   i   o   u   y`}
                  <div style={{ marginTop: 6 }}></div>
                  <strong>{`    ^           ^`}</strong>
               </div>
            </div>
         )}
      </div>
   );
};
function traditionalOpposite(letter: string) {
   if (letter === ' ') return ' ';

   //is this a consonant or vowel...
   const dict =
      CONSONANTS.indexOf(letter.toLowerCase()) > -1 ? CONSONANTS : VOWELS;

   //get the index of the latter in our word
   const letterIndex = dict.indexOf(letter.toLowerCase());

   //if character is not found, return it as is m.g.
   if (letterIndex === -1) return letter;

   return dict[dict.length - (letterIndex + 1)];
}
function indexHalvingOpposite(letter: string) {
   if (letter === ' ') return ' ';

   //is this a consonant or vowel...
   const dict =
      CONSONANTS.indexOf(letter.toLowerCase()) > -1 ? CONSONANTS : VOWELS;

   //get the index of the latter in our word
   const letterIndex = dict.indexOf(letter.toLowerCase());

   //if character is not found, return it as is m.g.
   if (letterIndex === -1) return letter;

   //half the length of the dictionary
   const a2 = dict.length / 2;

   //if the latter is in the first half of the pool, then go to the letter + 1/2 the pool length, or inverse if in 2nd half
   return letterIndex < a2 ? dict[letterIndex + a2] : dict[letterIndex - a2];
}

const CONSONANTS = [
   'b', //0
   'c', //1
   'd', //2
   'f',
   'g',
   'h',
   'j',
   'k',
   'l',
   'm', //9
   'n', //10
   'p',
   'q',
   'r',
   's',
   't',
   'v',
   'w', //17
   'x', //18
   'z' //19
];

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
