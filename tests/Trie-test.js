import { assert } from 'chai';
import CompleteMe  from '../scripts/Trie'
const fs = require('fs');
const text = "/usr/share/dict/words";
let dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('CompleteMe', () => {
  const completeMe = new CompleteMe();

  it('should be a function', () => {
    assert.isFunction(CompleteMe)
  });

  it('should have an empty object', () => {

    assert.deepEqual(completeMe.root.children, {})
  });

  it('should have a root with data equal to null', () => {
    assert.deepEqual(completeMe.root.data, null)
  });

  it('should make a node', () => {
    completeMe.insert('ape')
    // console.log(completeMe.root.children)
    // console.log(completeMe.root.children.p.children)
    assert.equal(completeMe.root.children.a.data, 'a')
    assert.equal(completeMe.root.children.a.children.p.data, 'p')
  })

  it('should have a node for the last letter in the first word', () => {
    completeMe.insert('bat')
    completeMe.insert('bed')
    assert.property(completeMe.root.children['b'].children['a'].children, 't')
  })

  it('the last letter of a word should have a true isWord prop', () => {
    completeMe.insert('bat')

    assert.deepEqual(completeMe.root.children.a.children.p.children.e.isWord, true)
  })

  it('after inserting multiple words, the first letter of each word is in root', () => {
    completeMe.insert('apple')
    completeMe.insert('boy')
    completeMe.insert('cat')
    //Object.keys(completeMe.root.children) // ['a','b','c']
    // assert.deepEqual(completeMe.root.children['a'].data, 'a')
    // assert.deepEqual(completeMe.root.children['b'].data, 'b')
    // assert.deepEqual(completeMe.root.children['c'].data, 'c')
    assert.deepEqual(Object.keys(completeMe.root.children), ['a', 'b', 'c'])
  })

  it('suggest should return children nodes which are words ', () => {
    completeMe.insert('pizza')
    completeMe.insert('cat')
    var completeWords1 = completeMe.suggest("piz")
    var completeWords2 = completeMe.suggest('ca')

    assert.deepEqual(completeWords1, ['pizza'])
    assert.deepEqual(completeWords2, ['cat'])
  })

  it('should find a specific node', () => {
    completeMe.insert('dog')
    let foundNode = completeMe.findNode('dog')

    assert.deepEqual(foundNode.data, 'g')
  })

  it('should whatever', () => {
    completeMe.insert('pie');
    completeMe.insert('pizza');

    var sortedSuggestions = completeMe.suggest('pi')

    completeMe.select('pi', 'pizza');

    assert.deepEqual(sortedSuggestions[0], 'pizza')
  })
})

describe('new Trie', () => {
  let completeMe = new CompleteMe();

  it('should have 235886 words in the dictionary', () => {
    completeMe.populate(dictionary);

    assert.equal(completeMe.counter, 235886)
  });

  it('should count the times a word is selected', () => {
    // completeMe.populate(dictionary);
    completeMe.select('piz', 'pizza');

    let foundNode = completeMe.findNode('pizza')

    assert.deepEqual(foundNode.selectionCounter, 1)
  })

  it('should return the most used word first', () => {
    var completeMe2 = new CompleteMe();

    completeMe2.populate(dictionary);
    completeMe2.select('ban', 'banal');
    completeMe.select('qui', 'quixotic')

    let sortedSuggestions = completeMe2.suggest('ban')
    let sortedSuggestions1 = completeMe.suggest('qui')

    assert.deepEqual(sortedSuggestions[0], 'banal')
    assert.deepEqual(sortedSuggestions1[0], 'quixotic')
  })
})
