import { useState, useEffect } from 'react'

const STORAGE_KEY = 'vocab'

export function useVocab() {
  const [vocabList, setVocabList] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setVocabList(stored)
  }, [])

  const addWord = (word) => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (stored.find((v) => v.word === word)) return
    const updated = [{ word, date: new Date().toISOString() }, ...stored]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setVocabList(updated)
  }

  const removeWord = (word) => {
    const updated = vocabList.filter((v) => v.word !== word)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setVocabList(updated)
  }

  const updateNote = (word, note) => {
    const updated = vocabList.map((v) => v.word === word ? { ...v, note } : v)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setVocabList(updated)
  }

  return { vocabList, addWord, removeWord, updateNote }
}
