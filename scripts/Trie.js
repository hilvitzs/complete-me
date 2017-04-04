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
    // find the node which represents input (e.g. 'ba')
    // findNode (input)
    // check if each child is word and if they have any children
    // repeat with each child
  }
  //
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
