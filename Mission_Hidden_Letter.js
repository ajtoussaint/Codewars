// Rules of decoding
// You will receive a string containing several sentences (the “letter”).

// The length of each word of the first sentence signals the word we must take for each of the following sentences. So if the first sentence has two words of 3 and 7 letters in it, we should pick the third word of the second sentence, and the seventh of the third. We would then be done with the first sentence of the hidden message.
// If there is another sentence in our letter after we are done picking the words signaled by the first sentence, we’ll treat it as we did the first. In our example, if there was a fourth sentence, we would count the lengths of its words as we did with the first, and pick the words in those positions in the following sentences; that would give us the second sentence of the hidden message - and we would go on like that indefinitely.
// Dots, question and exclamation marks (.?!) are the valid delimiters of the end of a sentence.
// Punctuation marks (such as those above, commas, quotes, and apostrophes) don’t go into the word count.
// Punctuation marks, except apostrophes, don’t transfer into the decoded message (so apostrophes do).
// Words with apostrophes count as one word (I’m would count as a word of two letters).
// Expected Output
// Each sentence of the decoded hidden message must have its first word capitalised (the rest should be in lowercase) and end with a dot ..
// Any sentence after a dot must be preceded by a space.
// There should be no spaces at the beginning or the end of the decoded message.
// For an empty string, return a empty string.
// Example
// 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "mission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.'
// Should return:

// 'The mission has been done.'

function foundationMessage(message) {
  let secret = [];
  let sentences = message.split(/[\.\?\!]/);
  sentences.length -= 1; //removes empty string after final punctuation
  for(let i = 0; i<sentences.length; i++){
    let words = sentences[i].split(" ").filter(word => !(/^[-,.?!'"]$/.test(word) || word.length < 1));
    let keys = [];
    words.forEach( (word,index) => {
      let letters = word.replaceAll(/[',"]/g,"").length;
      let sentence = index + i + 1;
      keys.push([sentence, letters])
    });
    keys.forEach(key => {
      secret.push(sentences[key[0]].split(" ").filter(word => !(/^[-,.?!'"]$/.test(word) || word.length < 1))[key[1]-1]);
    });
    i+=keys.length;
    secret.push(".");
  }
  return secret.map( (word,index) => {
    //remove surrounding single or double quotes
    let formatted = word.match(/[\w'\.]+/i)[0];
    //if index =0 or if the previous "word is punctuation capitalize"
    if(index == 0){
      let arr = formatted.split("");
      arr[0] = arr[0].toUpperCase();
      formatted = arr.join("");
    }else if(secret[index-1] == "."){
      let arr = formatted.split("");
      arr[0] = arr[0].toUpperCase();
      formatted = " " + arr.join("");
    }else{
      formatted = formatted.toLowerCase();
    }
    if( secret[index+1] != "." && word != "." ){
      formatted += " ";
    }
    return formatted;
  }).join("");
}