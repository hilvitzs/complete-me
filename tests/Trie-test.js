import { assert } from 'chai';
import CompleteMe  from '../scripts/Trie'

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

  it('should have an empty array called learned words', () => {
    assert.deepEqual(completeMe.learnedWords, []);
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

  it.skip('suggest should return children nodes which are words ', () => {
    // completion.insert("pizza")
    var completeWords = completeMe.suggest("piz")

    assert.deepEqual(completeWords, ["pizza"])
  })

  it('should find a specific node', () => {
    completeMe.insert('dog')
    let foundNode = completeMe.findNode('dog')

    assert.deepEqual(foundNode.data, 'g')
  })
})
