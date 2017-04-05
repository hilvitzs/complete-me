import Node from './Node'
require ('locus');

export default class CompleteMe {
  constructor () {
    this.root = new Node(null);
    this.learnedWords = [];
  }

  insert (data) {
    var currentNode = this.root;

    this.learnedWords.push(data);

    data.split('').forEach( letter => {
      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter];
      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
    });
    currentNode.isWord = true;
  }

  count () {
    return this.learnedWords.length;
  }

  suggest (input) {
    let wordSoFarLetterArray = input.split('');
    let currentNode = this.root;
    let suggestions = [];

    wordSoFarLetterArray.forEach( letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
    });
    return suggestions = this.getWord(currentNode, input, suggestions);
  }

  getWord (currentNode, input, suggestions) {
    if (currentNode.isWord) {
      suggestions.push(input);
    }
    let nodeChildrenKeys = Object.keys(currentNode.children);

    nodeChildrenKeys.forEach( key => {
      let nextNode = currentNode.children[key];

      this.getWord(nextNode, input + key, suggestions)
    });
    return suggestions;
  }
  
  findNode (input) {
    let splitArray = input.split('')
    let currentChar = splitArray.shift();
    let currentNode = this.root;

    while (currentNode.children[currentChar]) {
      currentNode = currentNode.children[currentChar];
      currentChar = splitArray.shift()
    }
    return currentNode;
  }
  //
  // populate () {
  //
  // }
  //
  // select () {
  //
  // }
}
