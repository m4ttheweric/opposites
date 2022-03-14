import React, { useState } from 'react';

export const Opposites: React.FC = props => {
   const [oppo, setOppo] = useState('');
   const [rev, setRev] = useState('');
   function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const val = event.target.value;
      if (!!val) {
         const opposites = [...val].map(letter => opposite(letter)).join('');
         setOppo(opposites);
         setRev([...val].reverse().join(''));
      } else {
         setOppo('');
         setRev('');
      }
   }
   return (
      <div>
         <p>
            <input placeholder={'Type Something!'} onChange={onChange} />
         </p>
         {!!oppo && (
            <>
               <p>
                  <span style={{ fontSize: '50%', marginRight: '5px' }}>
                     Opposite:
                  </span>
                  {oppo}
               </p>
               <p>
                  <span style={{ fontSize: '50%', marginRight: '5px' }}>
                     Reverse:
                  </span>
                  {rev}
               </p>
            </>
         )}
      </div>
   );
};

function opposite(letter: string) {
   if (letter === ' ') return ' ';

   //is this a consonant or vowel...
   const dict =
      CONSONANTS.indexOf(letter.toLowerCase()) > -1 ? CONSONANTS : VOWELS;

   //get the index of the latter in our word
   const letterIndex = dict.indexOf(letter.toLowerCase());

   if (letterIndex === -1) return letter;

   //half the length of the dictionary
   const a2 = dict.length / 2;

   //if the latter is in the first half of the pool, then go to the letter + 1/2 the pool length, or inverse if in 2nd half
   return letterIndex < a2 ? dict[letterIndex + a2] : dict[letterIndex - a2];
}

const CONSONANTS = [
   'b',
   'c',
   'd',
   'f',
   'g',
   'h',
   'j',
   'k',
   'l',
   'm',
   'n',
   'p',
   'q',
   'r',
   's',
   't',
   'v',
   'w',
   'x',
   'z'
];

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
