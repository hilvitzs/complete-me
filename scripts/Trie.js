import Node from './Node'


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

  // suggest () {
  //
  // }
  //
  // findNode () {
  //
  // }
  //
  // populate () {
  //
  // }
  //
  // select () {
  //
  // }
}
