import Node from './Node'
require ('locus');

export default class CompleteMe {
  constructor () {
    this.root = new Node(null);
    this.counter = 0;
  }

  insert (data) {
    var currentNode = this.root;

    data.split('').forEach( letter => {
      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter];
      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
    });
    currentNode.isWord = true;
    this.counter++;
  }

  // count () {
  //   return this.counter;
  // }

  // suggest (input) {
  //   let wordSoFarLetterArray = input.split('');
  //   let currentNode = this.root;
  //   let suggestions = [];
  //
  //   wordSoFarLetterArray.forEach( letter => {
  //     if (currentNode.children[letter]) {
  //       currentNode = currentNode.children[letter];
  //     }
  //   });
  //   return this.getWord(currentNode, input, suggestions);
  // }

  suggest(input) {
    let wordSoFarLetterArray = input.split('');
    let suggestions = []

    let currentChar = wordSoFarLetterArray.shift()
    let currentNode = this.root;


    while (currentNode.children[currentChar]) {
      currentNode = currentNode.children[currentChar]
      currentChar = wordSoFarLetterArray.shift()
    }
    return this.getWord(currentNode, input, suggestions)
  }

  getWord (currentNode, input, suggestions) {
    if (currentNode.isWord) {
      suggestions.push({word: input,
        selectedCounter: currentNode.selectionCounter});
    }

    let nodeChildrenKeys = Object.keys(currentNode.children);

    nodeChildrenKeys.forEach( key => {
      let nextNode = currentNode.children[key];

      this.getWord(nextNode, input + key, suggestions)
    });

    suggestions.sort( (a, b) =>
      b.selectionCounter - a.selectionCounter
    )

    let sortedSuggestions = suggestions.map (obj => {
      return obj['word'];
    });

    return sortedSuggestions;
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

  populate (data) {
    data.forEach( word => {
      this.insert(word);
    });
  }

  select (input, selection) {
    let inputArray = this.suggest(input)

    let selectedWord = inputArray.find( word => {
      return word === selection;
    })
    let foundNode = this.findNode(selectedWord);

    foundNode.selectionCounter++;
  }
}
