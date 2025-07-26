"use client"

import { useState, useEffect } from "react"

export function useLocalStorageState(initialState: boolean | string, key: string) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialState
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error)
      return initialState
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [value, key])

  return [value, setValue]
}
