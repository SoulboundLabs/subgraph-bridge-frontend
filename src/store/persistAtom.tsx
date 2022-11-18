import { AtomEffect } from 'recoil'

/* 
  Jordan Note: Note that I removed the async local storage options! Just designed to work with regular localstorage
*/

export interface PersistStorage {
  setItem(key: string, value: string): void | Promise<void>
  mergeItem?(key: string, value: string): Promise<void>
  getItem(key: string): null | string | Promise<string>
}

export interface PersistConfiguration {
  key?: string
  storage?: PersistStorage
}

/**
 * Recoil module to persist state to storage
 *
 * @param config Optional configuration object
 * @param config.key Used as key in local storage, defaults to `recoil-persist`
 * @param config.storage Local storage to use, defaults to `localStorage`
 */
export const recoilPersist = (
  config: PersistConfiguration = {}
): { persistAtom: AtomEffect<any> } => {
  if (typeof window === 'undefined') {
    return {
      persistAtom: () => {}
    }
  }

  const { key = 'recoil-persist', storage = localStorage } = config

  const persistAtom: AtomEffect<any> = ({ onSet, node, trigger, setSelf }) => {
    if (trigger === 'get') {
      const state = getState()

      if (state.hasOwnProperty(node.key)) {
        setSelf(state[node.key])
      }
    }

    onSet(async (newValue, oldValue, isReset) => {
      const state = getState()
      // Jordan Note: Not sure why isReset is true for a default value

      updateState(newValue, state, node.key, isReset)
    })
  }

  const updateState = (newValue: any, state: any, key: string, isReset: boolean) => {
    // Jordan Note: Not sure why isReset is true for a default value

    // if (isReset) {
    //   delete state[key]
    // } else {
    //   state[key] = newValue
    // }

    state[key] = newValue

    setState(state)
  }

  const getState = (): any => {
    const toParse = storage.getItem(key)
    if (toParse === null || toParse === undefined) {
      return {}
    }
    if (typeof toParse === 'string') {
      return parseState(toParse)
    }
    if (typeof toParse.then === 'function') {
      return toParse.then(parseState)
    }

    return {}
  }

  const parseState = (state: string) => {
    if (state === undefined) {
      return {}
    }
    try {
      return JSON.parse(state)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  const setState = (state: any): void => {
    try {
      storage.setItem(key, JSON.stringify(state))
    } catch (e) {
      console.error(e)
    }
  }

  return { persistAtom }
}
