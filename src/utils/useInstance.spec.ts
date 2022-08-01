import { getInstance, setInstance } from "./useInstance";

describe('#useInstance', () => {
    it('Should return current instance', () => {
        expect(getInstance()).toBeTypeOf("string")
    })

    it('Should change instance', () => {
        const currentInstance = getInstance()
        setInstance('https://nitter.kavin.rocks')
        const changedInstance = getInstance()

        expect(changedInstance).not.toBe(currentInstance)
    })
 })