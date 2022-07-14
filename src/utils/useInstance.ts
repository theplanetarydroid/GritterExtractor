export function useInstance(instance?: string): {
  getInstance: () => string;
  setInstance: (instance: string) => void;
} {
  let temp: { nitter_instance: string } = {
    nitter_instance: 'https://nitter.net',
  };

  const setInstance = (instance: string) => {
    temp.nitter_instance = instance;
  };

  if (instance) {
    setInstance(instance);
  }

  const getInstance = (): string => {
    return temp.nitter_instance;
  };

  return {
    getInstance,
    setInstance,
  };
}

const { getInstance, setInstance } = useInstance();
export { getInstance, setInstance };
